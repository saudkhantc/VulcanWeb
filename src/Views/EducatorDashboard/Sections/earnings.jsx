import React, { useEffect, useState } from 'react'
import Stripe from 'stripe';
import { MainBox } from '../styles'
import { useSelector } from 'react-redux'
import { httpsCallable } from 'firebase/functions'
import StripeLogo from '../../../Assets/Images/stripe.png'
import { functions } from '../../../Infrastructure/config'
import { Box, Button, Paper, Table, CircularProgress, TableBody, TableCell, TableContainer, TableRow, Typography, alpha } from '@mui/material'
import dayjs from 'dayjs';

const stripeApiKey = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_STRIPE_PROD_PRIVATE_KEY
    : process.env.REACT_APP_STRIPE_DEV_PRIVATE_KEY;
    
const stripe = new Stripe(stripeApiKey);

export const Earnings = () => {
    const [loading, setLoading] = useState(false)
    const [earnings, setEarnings] = useState(null)
    const [loginLink, setLoginLink] = useState(null)
    const [transactionDetails, setTransactionsDetails] = useState(null)
    const [accountStatus, setAccountStatus] = useState("")
    const userData = useSelector((state) => state.userData.data)
    const firstName = userData?.account?.first_name;
    const lastName = userData?.account?.last_name;
    const pendingBalance = earnings?.balance?.pending[0]?.amount ?
        (earnings.balance.pending[0].amount / 100).toFixed(2) : 0.00;
    const balance = pendingBalance ? pendingBalance : 0.00;
    const payouts = earnings?.payouts ? earnings.payouts : 0.00;
    const accountId = userData?.stripe?.stripe_account_id;

    const connectAccount = async () => {
        try {
            setLoading(true)
            const connectStripeAccount = httpsCallable(functions, "setupstripeaccount");
            const res = await connectStripeAccount({ firstName, lastName });
            window.location.href = res?.data?.url;
        } catch (error) {
            // console.error("Error setting up Stripe account:", error);
        }
    }
    const stripeAccountDetails = () => {
        window.open(loginLink, '_blank');
    }
    useEffect(() => {
        async function createLoginLink() {
            try {
                if (accountStatus === "completed") {
                    const res = await stripe.accounts.createLoginLink(accountId);
                    setLoginLink(res.url);
                }
            } catch (error) {
                // handle error here
            }
        }
        createLoginLink();
    }, [accountId, accountStatus]);
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const getAccountBalance = httpsCallable(functions, "geteducatoraccbalance");
                const res = await getAccountBalance({});
                setEarnings({ balance: res?.data?.balance, payouts: res?.data?.payouts })
            } catch (error) {
                // console.error("Error getting educator account earnings:", error);
            } finally {
                setLoading(false)
            }
        }
        if (accountId) {
            fetchData();
        }
    }, [accountId]);
    useEffect(() => {
        const fetchAccountStatus = async () => {
            try {
                setLoading(true)
                const account = await stripe.accounts.retrieve(accountId)
                if (account.details_submitted && account.charges_enabled && account.payouts_enabled) {
                    setAccountStatus("completed")
                } else if (!account.details_submitted && !account.charges_enabled && !account.payouts_enabled) {
                    setAccountStatus("partial")
                }

            } catch (error) {
                // console.error('Error fetching account status:', error);
            } finally {
                setLoading(false)
            }
        };
        if (accountId) {
            fetchAccountStatus();
        } else {
            setAccountStatus("new")
        }
    }, [accountId]);
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const getTransactions = httpsCallable(functions, "/");
                const res = await getTransactions({ stripe_account_id: accountId });
                setTransactionsDetails(res?.data?.paymentIntents)
            } catch (error) {
                // console.error("Error getting educator account earnings:", error);
            } finally {
                setLoading(false)
            }
        }
        if (accountId) {
            fetchData();
        }

    }, [accountId])
    const handleTotalAmount = (amount, fee) => {
        const totalAmount = (amount - fee) / 100;
        return totalAmount;
    }
    return (
        <MainBox width={"full"}>
            <Box sx={{ display: 'flex', gap: 8, mb: 5 }}>
                <Typography variant='h1'>Earnings</Typography>
            </Box>
            {
                loading ? <Box width={'100%'} height={'50vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}><CircularProgress /></Box> :
                    <Box display={'flex'} flexDirection={'column'} gap={5}>
                        {
                            accountStatus === "completed" ?
                                <Box sx={{ p: { xs: 2, sm: 5 }, borderRadius: '15px', bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1), display: "flex", flexDirection: "column", gap: 8 }}>
                                    <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} gap={{ xs: 5, sm: 0 }} justifyContent={"space-between"}>
                                        <Box display={"flex"} justifyContent={{ xs: 'space-between', sm: 'flex-start' }} gap={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                <Typography variant="body1" color="initial" fontSize={16} fontWeight={'600'}>Total Payouts</Typography>
                                                <Typography variant="body1" color="initial" fontSize={24} fontWeight={'900'}>${payouts}</Typography>
                                                <Typography variant="body1" fontSize={16} color="grey" fontWeight={'500'}>1 class</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                <Typography variant="body1" color="initial" fontSize={16} fontWeight={'600'}>Current Balance</Typography>
                                                <Typography variant="body1" color="initial" fontSize={24} fontWeight={'900'}>${balance}</Typography>
                                                <Typography variant="body1" fontSize={16} color="grey" fontWeight={'500'}>${balance} available</Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Button sx={{ width: { xs: '100%', sm: '300px' }, borderRadius: '5px', height: "50px" }} variant="contained" color="primary" onClick={stripeAccountDetails}>
                                                View Payouts on Stripe
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography variant="body1" color="initial" fontSize={16} fontWeight={'600'} py={2}>Recent Enrollments</Typography>
                                        <TableContainer component={Paper}>

                                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                <TableBody>
                                                    {
                                                        transactionDetails?.length > 0 ? (
                                                            transactionDetails?.map((transaction, index) =>
                                                            (<TableRow key={index}>
                                                                <TableCell sx={{ fontSize: 16, fontWeight: '600', py: 2, pl: 7 }} align="left">{transaction?.metadata?.cohort_id}</TableCell>
                                                                <TableCell sx={{ fontSize: 16, fontWeight: '600', py: 2, pl: 7 }} align="left">{transaction?.metadata?.course_title}</TableCell>
                                                                <TableCell sx={{ fontSize: 16, fontWeight: '600' }} align="left">
                                                                    {dayjs.unix(transaction?.created).format('DD/MM/YYYY')}
                                                                </TableCell>
                                                                <TableCell sx={{ fontSize: 16, fontWeight: '600' }} align="left">${handleTotalAmount(transaction?.amount, transaction?.application_fee_amount)}
                                                                </TableCell>
                                                            </TableRow>
                                                            ))
                                                        ) : (
                                                            <TableRow>
                                                                <TableCell sx={{ fontSize: 16, fontWeight: '600', py: 2, pl: 7 }} colSpan={3} align="center">No Transactions Found</TableCell>
                                                            </TableRow>
                                                        )
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                    </Box>
                                </Box>
                                :
                                <Box>
                                    <Box sx={{ borderRadius: '15px', border: "3px solid grey", p: { xs: 2, sm: 5 } }} display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'} alignItems={'center'} gap={5}>
                                        <Typography sx={{ fontSize: '28px', fontWeight: '500' }} dangerouslySetInnerHTML={{
                                            __html: accountStatus === "new" ? "We use Stripe to make sure  you get paid on time and to keep your personal bank  and details secure. Click <b>Link Stripe Account</b> to setup your payments on time." :
                                                accountStatus === "partial" ? "You must complete onboarding through stripe to continue" : ""
                                        }}>
                                        </Typography>
                                        <Box sx={{ height: 100, width: { xs: "100%", sm: 500 }, position: 'relative', overflow: 'hidden' }}>
                                            <img src={StripeLogo} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} alt="not found" />
                                        </Box>
                                    </Box>
                                    <Button sx={{ my: 5, borderRadius: '5px', height: "50px" }} variant="contained" color="primary" onClick={connectAccount}>
                                        {accountStatus === "new" ? "Link Stripe Account" : accountStatus === "partial" ? "Complete OnBoarding" : ""}
                                    </Button>
                                </Box>
                        }
                    </Box>
            }
        </MainBox>
    )
}
