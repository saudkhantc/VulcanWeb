import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { functions } from "../../Infrastructure/config";
import { httpsCallable } from "firebase/functions";
import { useSelector } from "react-redux";
import { Loader } from "../Common/loader";
import { Box, useTheme, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_DEV_PUBLIC_KEY);

export const CheckoutForm = () => {
  const theme = useTheme();
  const location = useLocation();
  const { course_title, duration, instructor, cost, start_date, times, student_id, stripe_acc_id, cohort_id, course_id, instructorId } = location.state
  let price = parseInt(cost)
  const [fee, setFee] = useState(0)
  const [clientSecret, setClientSecret] = useState(null)
  const loading = useSelector((state) => state.userData.loading);
  const convertToLocalStartTime = (timestamp, userTimezone) => {
    const date = new Date(timestamp * 1000);
    const options = { hour12: true, hour: 'numeric', minute: 'numeric', timeZone: userTimezone };
    return date.toLocaleString('en-US', options);
  };
  const convertToLocalEndTime = (timestamp, userTimezone) => {
    const date = new Date(timestamp * 1000);
    const options = { hour12: true, hour: 'numeric', minute: 'numeric', timeZoneName: 'short', timeZone: userTimezone };
    return date.toLocaleString('en-US', options);
  };
  const formatSchedule = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (times) {
      const dayGroups = {};
      Object.entries(times).forEach(([day, { start, end }]) => {
        const formattedStart = convertToLocalStartTime(start, timezone);
        const formattedEnd = convertToLocalEndTime(end, timezone);
        const hasMinutes = formattedStart.includes(':') || formattedEnd.includes(':');
        const formattedTime = hasMinutes
          ? `${formattedStart}-${formattedEnd}`
          : `${formattedStart.split(':')[0]}-${formattedEnd.split(':')[0]}`;
        if (!dayGroups[day]) {
          dayGroups[day] = [];
        }
        dayGroups[day].push(formattedTime);
      });

      // Sort the days (keys) of dayGroups
      const sortedDays = Object.keys(dayGroups).sort((dayA, dayB) => {
        const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
      });

      const formattedSchedule = sortedDays.map(day => {
        const capitalizedDay = day.substring(0, 3).toUpperCase();
        const scheduleForDay = dayGroups[day].join(' / ');
        return `${capitalizedDay}: ${scheduleForDay}`;
      });

      return formattedSchedule;
    }
    return ['No schedule available'];
  };
  const formatTimes = formatSchedule()
  function timestampToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  }
  const formattedDate = timestampToDate(start_date);
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        if (stripe_acc_id) {
          let amountInDollars = price;
          let feeAmountInDollars = 0;
          if (amountInDollars === price) {
            const extraPercentage = 0.1;
            const platformFee = amountInDollars * extraPercentage;
            amountInDollars += platformFee;
            feeAmountInDollars = platformFee;
          }
          const amountInCents = Math.round(amountInDollars * 100);
          const feeAmountInCents = Math.round(feeAmountInDollars * 100);
          setFee(feeAmountInDollars)
          const data = {
            times,
            duration,
            cohort_id,
            course_id,
            start_date,
            student_id,
            instructor,
            instructorId,
            course_title,
            stripe_acc_id,
            amount: amountInCents,
            application_fee_amount: feeAmountInCents,
          };
          const checkout = httpsCallable(functions, "checkout");
          const res = await checkout(data);
          setClientSecret(res?.data?.clientSecret)
        }
      } catch (error) {
        // console.log(error)
      }
    }
    fetchClientSecret()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ background: theme.palette.primary.main }} minHeight={'100vh'}>
      {
        !loading ? (
          <Box py={6} display={'flex'} flexDirection={{ xs: "column", md: 'row' }} width={'100%'}>
            <Box width={{ xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' }} sx={{ px: { xs: 5, sm: 10, lg: 20 }, py: 4 }} display={'flex'} flexDirection={"column"} gap={1}>
              <Typography variant="h4" color="white">Product Details</Typography>
              <Typography color="grey" sx={{ fontSize: "16px" }}>Cohort: {cohort_id}</Typography>
              <Typography color="grey" sx={{ fontSize: "16px" }}>Course Title: {course_title}</Typography>
              <Typography color="grey" sx={{ fontSize: "16px" }}>Total Amount: ${price + fee}</Typography>
              <Typography color="grey" sx={{ fontSize: "16px" }}>Cost: ${price}</Typography>
              <Typography color="grey" sx={{ fontSize: "16px" }}>Platform Fee: ${fee.toFixed(2)}</Typography>
              <Typography color="grey" sx={{ fontSize: "16px" }}>Course Duration: {duration} Weeks</Typography>
              <Typography color="grey" sx={{ fontSize: "16px" }}>Instructor: {instructor}</Typography>
              <Typography color="grey" sx={{ fontSize: "16px" }}>Start Date of Course: {formattedDate}</Typography>
              <Typography color="white" variant="h3" sx={{ fontSize: "16px", pb: 2 }}>
                Course Timings:
                {formatTimes.map((time, index) => (
                  <Typography color={'grey'} key={index}>{time}</Typography>
                ))}
              </Typography>

            </Box>
            <Box width={{ xs: '100%', md: '50%' }}>
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </Box>
          </Box>
        ) : (
          <Loader />
        )
      }
    </Box>
  );
};

