import React from "react";
import {
  Description,
  Heading,
  MainContainer,
  MainSubContainer,
  Subtitle,
  Title,
  styles,
} from "./styles.js";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FiberManualRecord as BulletIcon } from "@mui/icons-material";
import { PrivacyLinks } from "../Policies/styles.js";

const InfoList = () => {
  return (
    <List sx={{ width: "90%" }}>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="registration information when you create a User account
          "
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="profile information, such as city and state, educational level or background, and educational subjects          "
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="uploaded content (photographs, essays, lessons, etc.)"
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="lesson recordings (if you have consented to recording of lessons)"
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "10px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="video answers          "
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="questions, comments, or other information when you communicate with us, by phone, email, or via third party social media sites, or participate in interactive features of the Service (including Customer Support messages and online tool chat messages)"
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
    </List>
  );
};
const InfoUsage = () => {
  return (
    <List sx={{ width: "90%" }}>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="Account creation and to provide the Service, including without limitation, access to previous lessons, instructor-matching services, information about prospective instructors, and facilitating communication directly between students and instructors.          "
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="To process transactions and billing.          "
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>

      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary=" For identification and authentication purposes."
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary=" To communicate with you concerning the Service, User requests, transactions, security, privacy and administrative issues relating to your use of the Service, and services that we think may be of interest to you."
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary=" Process and deliver contest and sweepstakes entries and rewards and verify eligibility."
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>

      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="Personalize and improve the Service and deliver and display targeted advertisements on our Service, content or features in the Service and on other sites or apps."
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>

      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="For administration of and troubleshooting regarding the System."
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
    </List>
  );
};
const RightToKnowList = () => {
  return (
    <List sx={{ width: "90%" }}>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="The categories of personal information we have collected about you."
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="The categories of sources from which the personal information is collected."
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="The business or commercial purpose for collecting your personal information."
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="The categories of third parties with whom we have shared your personal information."
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="The speciﬁc pieces of personal information we have collected about you."
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
    </List>
  );
};
export default function privacy() {
  return (
    <MainContainer>
      <Heading variant="" sx={styles.heading}>
        Privacy Policy
      </Heading>
      <MainSubContainer>
        <Description variant="body3">Effective on August 1, 2021</Description>
        <Description variant="body3">
          This Privacy Policy is designed to help you understand how Vulcan
          Learning Institute, Inc. and our affiliates (“Vulcan”, “we” or “our”)
          collect, process, store, and share personal information about our
          Users. It also explains what controls you have on how Vulcan collects
          and processes your information. The term “you” or “User” refers to
          students, instructors or any person or entity who views, uses,
          accesses, browses or submits any content or material to the Service
          (defined below).
        </Description>
        <Description variant="body3">
          Providing your personal information is voluntary and your use of the
          Service after the effective date of this document constitutes your
          acceptance of this Privacy Policy. If you do not agree to all the
          terms and conditions of this Privacy Policy, do not use the Service.
        </Description>
        {/* =================================================================== */}
        <Title variant="">Scope of this Policy</Title>
        <Description variant="body3">
          {" "}
          This Privacy Policy applies only to personal information we collect
          via the website <PrivacyLinks>www.vulcanlearninginstitute.com</PrivacyLinks> {" "}
          (“Site”), online and mobile applications (“Apps”), email, telephone,
          electronic devices and other interactive services (collectively “the
          Service”).
        </Description>

        {/* =================================================================== */}
        <Title variant="h5"> The Information We Collect</Title>
        <Description variant="body3">
          You don’t have to create an account to use some of our service
          features. If you do not create an account, we do collect information
          about your browser and device (IP address, browser version, etc.) but
          we cannot link that information to an identifiable person unless and
          until you create an account.
        </Description>
        <Description variant="body3">
          {" "}
          If you do choose to create an account, you must provide us with some
          personal information so that we can provide the Service. This includes
          information you provide to us, such as:
        </Description>
        <InfoList />

        {/* =================================================================== */}
        <Subtitle variant="h5"> Students and parents</Subtitle>
        <Description variant="body3">
          {" "}
          We may also collect personal information related to your documentation
          of and payment for educational sessions; educational questions related
          to homework or your studies; school information; teacher feedback of a
          student (once the parent provides consent for submission); and content
          you upload for the purposes of transmitting it to another user or for
          public display on the Site or Apps.
        </Description>

        {/* =================================================================== */}
        <Subtitle variant="h5">Financial information</Subtitle>
        <Description variant="body3">
          If you elect to pay for educational lessons with a credit card, we
          will collect your name, credit card number, expiration date, and
          address information associated with the account. We collect bank
          information from instructors who list their services on the platform
          for the purposes of transmitting payment to them.
        </Description>
        <Description variant="body3">
          If you are a instructor and elect to pay for a background check, we
          will collect credit card information to order a background check on
          your behalf. Payment information entered into our System solely to
          procure a background check will not be stored on our servers.
        </Description>

        {/* =================================================================== */}
        <Title variant="h5"> Additional Information We Receive About You</Title>
        <Subtitle variant="h5"> Information we collect automatically</Subtitle>
        <Description variant="body3">
          We also gather additional personal information when you use the
          Service, including type of browser you use, access time, pages viewed,
          IP address, and, if enabled, geolocation; and we collect information
          about the computer or mobile device you use to access the Service,
          including without limitation operating system and unique device
          identifiers and mobile network information. This data is used to
          better understand and enhance Users experience with the Service and on
          the Site and Apps. Vulcan may publish aggregate User statistics or
          share them with third parties.
        </Description>
        {/* =================================================================== */}
        <Subtitle variant="h5">
          {" "}
          Information we collect from other sources
        </Subtitle>
        <Description variant="body3">
          We may also obtain personal information from our background check
          administrator and combine that with information we collect through the
          Service. For example, we may view information about you for the
          purposes of identity verification, credit bureaus, and other
          background check information, including from publicly available
          sources, but this information is not stored on our systems. If you log
          into your account through single sign-on services, like Facebook
          Connect or Google Authenticator, you provide Vulcan with permission to
          access certain information about you, such as your Facebook User ID,
          user profile, and profile picture. User generated content on the Site
          or App that is cross-posted through certain social networking
          preferences (e.g. pages you “Like” or “Follow”) may be viewed by the
          general public. Accordingly, Vulcan cannot ensure the privacy of any
          personal information included in such User generated content.
        </Description>
        {/* =================================================================== */}
        <Title variant="h5"> How We Use Your Information</Title>
        <Subtitle variant="h5">
          {" "}
          Vulcan may use your personal information for various purposes,
          including:
        </Subtitle>

        <InfoUsage />
        {/* =================================================================== */}
        <Title variant="h5"> Information We Share And Disclose</Title>

        <Description variant="body3">
          {" "}
          We do not sell your personal information. To make the Site work, we
          may need to share some of your personal information with other Users,
          our affiliates, third parties, and service providers. This section
          explains when and why we share your information.
        </Description>
        {/* =================================================================== */}

        <Subtitle variant="h5">User Content</Subtitle>

        <Description variant="body3">
          Your member profile and information that you post or share, such as
          instructor bio, educational background, city and state, rate, photos,
          reviews, comments, suggestions, and information about you or your
          experience, may be seen and shared with other Users of our Service.
          You should therefore think carefully before deciding what information
          you share.
        </Description>
        {/* =================================================================== */}

        <Subtitle variant="h5">Information Shared Between Users</Subtitle>

        <Description variant="body3">
          Vulcan shares a minimum amount of personal information between
          instructors and students in order to facilitate the arrangement of
          educational sessions, including, your first name and last initial,
          city, photo, and details about the educational services you seek or
          provide.
        </Description>
        {/* =================================================================== */}

        <Subtitle variant="h5">Referrals</Subtitle>

        <Description variant="body3">
          If you choose to use our referral service, to tell a friend about our
          Service, we will ask you for your friend’s email address. We will
          automatically send your friend an email inviting him or her to visit
          the Site and up to two reminders. Vulcan stores this information for
          the sole purpose of sending this one-time email and reminders and
          tracking the success of our referral program. Your friend may click
          Unsubscribe at the bottom of any email, or contact us at
          <PrivacyLinks>info@vulcanlearninginstitute.com</PrivacyLinks> to request removal from our database.
        </Description>
        {/* =================================================================== */}

        <Subtitle variant="h5">Cookies and Similar Technologies</Subtitle>

        <Description variant="body3">
          Third parties, including Facebook, may use cookies, web beacons, and
          other storage technologies to collect or receive information from our
          Site, apps and elsewhere on the internet and use that information to
          provide measurement services and target ads. Most web browsers let you
          choose whether to accept cookies and let you delete cookies already
          set. The choices available, and the mechanism used, will vary from
          browser to browser, but are typically found in the “options”, “tools”
          or “preferences” menu. There also are online tools available for
          clearing all cookies left behind by the websites you have visited,
          such as <PrivacyLinks> http://www.aboutads.info/choices</PrivacyLinks> and{" "}
          <PrivacyLinks>
          www.allaboutcookies.org
            </PrivacyLinks>.
        </Description>
        {/* =================================================================== */}

        <Subtitle variant="h5">Service Providers</Subtitle>

        <Description variant="body3">
          We engage service providers to perform functions and provide services
          to us in the United States. For example, we use a variety of
          third-party services to help operate our services to help us
          understand the use of our services, such as Google Analytics. We may
          share your private personal data with such service providers for
          business purposes such as to verify transactions and prevent fraud or
          identity theft, subject to obligations consistent with this Privacy
          Policy and any other appropriate confidentiality and security
          measures, and on the condition that the third parties use your private
          personal data only on our behalf and pursuant to our instructions
          (service providers may use other non-personal data for their own
          benefit). We share your payment information with payment services
          providers to process payments; prevent, detect, and investigate fraud
          or other prohibited activities; facilitate dispute resolution such as
          chargebacks or refunds; and for other purposes associated with the
          acceptance of credit and debit cards.
        </Description>
        {/* =================================================================== */}

        <Title variant="h5">Data Transmission And Storage</Title>

        <Description variant="body3">
          Vulcan uses industry-standard 128-bit SSL encryption when collecting
          and transmitting your information through the Site and the Vulcan
          network. Unfortunately, even with these measures, Vulcan cannot
          guarantee the security of personal information. By using the Service,
          you acknowledge and agree that Vulcan makes no such guarantee, and
          that you use the Service at your own risk.
        </Description>
        {/* =================================================================== */}

        <Title variant="h5">Managing Your Personal Information With Us</Title>
        <Subtitle variant="h5">
          Modifying or correcting your information
        </Subtitle>
        <Description variant="body3">
          If you have an account with us, you can access, correct, delete, or
          modify some of the personal information you provided to us in your
          account settings.
        </Description>
        {/* =================================================================== */}

        <Subtitle variant="h5">Email</Subtitle>

        <Description variant="body3">
          Vulcan may send you email communications periodically detailing new
          Service features or promotions. You may unsubscribe from these
          messages by using the link at the bottom of the email. We will still
          send you email messages about the status of your account or any
          notices as required by law. You may not opt-out of receiving these
          administrative emails so long as you continue to use the Service. If
          you wish to terminate your account, please contact us.
        </Description>
        {/* =================================================================== */}

        <Subtitle variant="h5">Location Information</Subtitle>

        <Description variant="body3">
          You can prevent your device from sharing location information through
          your device’s system settings. But if you do, this may impact Vulcan’s
          ability to provide you our full range of features and services.
        </Description>
        {/* =================================================================== */}

        <Subtitle variant="h5">Cookie Tracking</Subtitle>

        <Description variant="body3">
          You can modify your cookie settings on your browser settings. If you
          delete or choose not to accept our cookies, you may be missing out on
          certain features of the Service.
        </Description>
        {/* =================================================================== */}

        <Subtitle variant="h5">Do Not Track</Subtitle>

        <Description variant="body3">
          Your browser may offer you a “Do Not Track” option, which allows you
          to signal to operators of websites and web applications and services
          that you do not want them to track your online activities. The Service
          does not currently support Do Not Track requests at this time.
        </Description>
        {/* =================================================================== */}
        <Title variant="h5">California Residents</Title>

        <Description variant="body3">
          The California Consumer Privacy Act provides some California residents
          with the additional rights listed below.
        </Description>

        {/* =================================================================== */}
        <Subtitle variant="h5">Right to Know</Subtitle>

        <Description variant="body3">
          You have the right to know and see what data we have collected about
          you over the past 12 months, including:
        </Description>
        <RightToKnowList />
        {/* =================================================================== */}
        <Subtitle variant="h5">Right to Delete</Subtitle>

        <Description variant="body3">
          You have the right to request that we delete the personal information
          we have collected from you (and direct our service providers to do the
          same). Note that deletion requests are subject to certain limitations,
          for example, we may keep information as required or permitted by law,
          to process transactions, certain account-related information, to
          facilitate User requests, and protect and fix our system.
        </Description>
        {/* =================================================================== */}
        <Subtitle variant="h5">Our Rights</Subtitle>

        <Description variant="body3">
          You have the right not to be discriminated against for exercising any
          of the rights listed above.
        </Description>
        {/* =================================================================== */}
        <Subtitle variant="h5">
          Exercising Your California Privacy Rights
        </Subtitle>

        <Description variant="body3">
          To request access to or deletion of your personal information, or to
          exercise any other data rights under California law, please write us
          at <PrivacyLinks>info@vulcanlearninginstitute.com</PrivacyLinks>. Please include your full name,
          email address, and phone number associated with your use of the Site,
          along with why you are writing, so that we can process your request in
          an efﬁcient manner.
        </Description>
        {/* =================================================================== */}
        <Subtitle variant="h5">Response Timing</Subtitle>

        <Description variant="body3">
          We aim to respond to a consumer request for access or deletion within
          45 days of receiving that request. If we require more time, we will
          inform you of the reason and extension period in writing.
        </Description>
        {/* =================================================================== */}
        <Title variant="h5">Children and Our Services</Title>
        <Subtitle variant="h5">
          This Service is not intended for use by children under 13 years of
          age.
        </Subtitle>

        <Description variant="body3">
          Vulcan does not knowingly collect personally identifiable information
          from children under the age of 13. If you are under the age of 13,
          please do not provide your contact information or any other personally
          identifiable information to Vulcan. If you are the parent or legal
          guardian of someone under the age of 13 who may have provided us with
          information without your knowledge or consent, please contact us to
          have this information removed. All contact, including educational
          sessions, between a instructor and any minor should, of course, take
          place only in a supervised setting.
        </Description>
        {/* =================================================================== */}
        <Title variant="h5">Privacy Policy Changes</Title>

        <Description variant="body3">
          Vulcan reserves the right to change or update this Privacy Policy from
          time to time. We will post any changes here and indicate the new
          effective date of the Privacy Policy at the top of the document. We
          encourage you to review the Privacy Policy for any updates while you
          are an active User of the Site.
        </Description>
        <Description variant="body3">
          The Site is hosted in the United States and is governed by United
          States law. If you are using the Site from outside the United States,
          please be aware that your information may be transferred to, stored
          and processed in the United States where our servers are located, and
          our databases are operated. The data protection and other laws of the
          United States and other countries might not be as comprehensive as
          those in your country. By using the Site, you consent to your
          information being transferred to our facilities and to the facilities
          of those third parties with whom we share it as described in our
          Privacy Policy.
        </Description>

        {/* =================================================================== */}
        <Title variant="h5">How to Contact Us</Title>

        <Description variant="body3">
          {" "}
          Questions regarding this Privacy Policy should be directed to {""}
          <PrivacyLinks>info@vulcanlearninginstitute.com</PrivacyLinks>
        </Description>
      </MainSubContainer>
    </MainContainer>
  );
}
