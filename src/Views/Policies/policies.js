import React from "react";
import {
  Description,
  Heading,
  styles,
  MainContainer,
  Title,
  MainSubContainer,
  PrivacyLinks,
} from "./styles.js";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FiberManualRecord as BulletIcon } from "@mui/icons-material";

const MyList = () => {
  return (
    <List sx={{ width: "90%" }}>
      <ListItem>
        <ListItemIcon sx={{ minWidth: "20px", padding: 0 }}>
          <BulletIcon sx={{ fontSize: "10px", color: "black" }} />
        </ListItemIcon>
        <ListItemText
          primary="Defame, abuse, harass in any form, harm, stalk, threaten or otherwise violate the legal rights (including without limitation rights of privacy and publicity) of others."
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
          primary="Create, upload, post, send, receive or store any false, misleading, profane, defamatory, infringing, hateful, distasteful, obscene or unlawful topic, name, information, materials or content."
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
          primary="Use the Site for any purpose that is in violation of local, state, national, or international law, including without limitation wage/hour and working condition laws and regulations."
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
          primary="Create an account or accounts on the Site for fraudulent purposes, or for the purpose of misusing the Site, including without limitation misappropriating the Site or any information on the Site for your own commercial or pecuniary gain.
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
          primary="Upload files that contain software or other content that violates the rights of any third party, including without limitation intellectual property rights or rights of privacy or publicity.          "
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
          primary="Upload files that contain viruses, Trojan horses, worms, time bombs, spiders, cancel bots, corrupted files, or any other similar software, malware or content that may damage, interfere with, disrupt, impair, disable or otherwise overburden the operation of any device, computer system or network.          "
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
          primary="Take any action that would undermine any aspect of the Site."
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
          primary="Attempt to gain unauthorized access to the Site, other User accounts, or other device, computer system or networks connected to the Site.          "
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
          primary="Advertise or offer to sell any goods or services for any commercial purpose on the Site that are not appropriate or relevant to the Site.          "
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
          primary="Impersonate another person or allow any other person or entity to impersonate you or use your credentials to access the Site.          "
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
          primary="Post the same content repeatedly or spam - spamming is strictly prohibited"
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
          primary="Download, copy or transmit any file posted by another User that you know, or reasonably should know, cannot be legally published through the Site          "
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
          primary="Access, download, or copy any information, content and/or materials from the Site through artificial means (including without limitation spiders, scrapers, hacking devices, computer programs, bots, web spoofing, URL rewriting or other such means).          "
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
          primary=" Reproduce, duplicate, copy, sell, re-sell or exploit any information, materials or content on Site; or          "
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
          primary=" Restrict or inhibit any other User from using and enjoying the Site         "
          primaryTypographyProps={{
            sx: styles.listItemText,
          }}
        />
      </ListItem>
    </List>
  );
};

export default function Policies() {
  return (
    <>
      <MainContainer>
        <Heading variant="" sx={styles.heading}>
          Terms, Conditions, and Policies
        </Heading>
        <MainSubContainer>
          <Description variant="body3">
            These Terms of Use (“Terms”) govern your use of the Vulcan website
            (“Site”) at www.vulcanlearninginstitute.com, any mobile device
            application or any other means provided or authorized by Vulcan
            Learning Institute, Inc. (“Vulcan”). Please read these Terms before
            using or continuing to use the Site. Do not agree to the Terms
            unless you both fully understand and accept each provision. By using
            or continuing to use the Site, you represent and warrant that you
            understand, agree to, and accept all terms and conditions contained
            in these Terms.
          </Description>
          {/* ================================================================================================= */}

          <Title variant="h5">1. General terms</Title>
          <Description variant="body3">
            Vulcan provides this Site to Users seeking educational services
            (“Students”) and to Users seeking to provide educational services
            (“Instructors”), and to any other entity on whose behalf Users
            accept these Terms. The term “you” or “You” or “User” or “Users”
            shall refer to Students, Instructors or any person or entity who
            views, uses, accesses, or browses any content on, and/or creates,
            uploads, posts, sends, receives or stores content to the Site. These
            Terms are entered into by and between Vulcan and you, and you accept
            them by: (a) accessing or viewing the content of the Site; (b)
            contracting for educational lessons through the Site; (c)
            registering as a instructor or providing educational lessons through
            the Site (d) using the Site in any other manner; and/or (e)
            acknowledging agreement with these Terms. If you do not agree to
            these Terms, do not use the Site.
          </Description>
          <Description variant="body3">
            To the extent that anything in or associated with the Site is in
            conflict or inconsistent with these Terms, the Terms shall control.
            Any express waiver or failure to exercise promptly any right under
            the Terms will not create a continuing waiver or any expectation of
            non-enforcement. If any provision of the Terms is held invalid by
            any law or regulation of any government, or by any court or
            arbitrator, the parties agree that such provision will be replaced
            with a new provision that accomplishes the original business
            purpose, and the other provisions of the Terms will remain in full
            force and effect.
          </Description>
          {/* ================================================================================================= */}

          <Title variant="h5">2. Privacy Policy</Title>
          <Description color={"primary"} variant="body3">
            Please refer to the Vulcan Privacy Policy at{" "}
            {/* <a style={{ wordWrap: "break-word", color:"primary" }} href="/"> */}
            <PrivacyLinks> https://www.vulcanlearninginstitute.com/privacy </PrivacyLinks>
            {/* </a>{" "} */}
            for information on how Vulcan collects, uses and discloses
            information about you.
          </Description>

          {/* ================================================================================================= */}
          <Title variant="h5"> 4. Your obligations and conduct </Title>
          <Description variant="body3">
            All Users must: (a) be of legal age and have capacity to agree to
            these Terms on their own behalf or on behalf of a minor who will be
            receiving educational services; (b) reside within the United States,
            (c) provide accurate, current, and complete information about
            themselves as required during Site registration (“Registration
            Data”); (d) maintain the security of any password and identification
            information used to access the Site; (e) maintain and promptly
            update the Registration Data and any information you provide to
            Vulcan, keep it accurate, current and complete; and (f) accept all
            risks of unauthorized access to information and Registration Data.
            <b>
              You are not permitted to use the Site or the services or submit
              content to the Site if you are under the age of 13.
            </b>
          </Description>
          <Description variant="body3">
            You are entirely responsible for all content that you create,
            upload, post, send, receive or store through your use of the Site
            (“Content”). Users shall not create, upload, post, send, receive or
            store Content that: (a) is inaccurate, harmful, obscene,
            pornographic, defamatory, racist, violent, offensive, harassing,
            inconsistent with the Vulcan mission or otherwise objectionable to
            Vulcan or other Users; (b) includes unauthorized disclosure of
            personal information; (c) violates or infringes anyone’s
            intellectual property rights; or (d) contains software viruses or
            any other computer code, files or programs designed to interrupt,
            destroy or limit the functionality of any computer software or
            hardware or telecommunications equipment. Vulcan reserves the right
            to edit or remove Content that violates these Terms, that contains
            third-party commercial advertisements, or for any other reason it
            deems necessary.
          </Description>
          <Description variant="body3">
            Users must use the Site in a manner that is lawful, relevant and
            proper to the applicable forum. Any use of the Site that Vulcan, in
            its sole discretion, finds inappropriate and/or offensive may result
            in suspension and/or termination of a User with or without notice.
            Specifically, but without limitation, Users may not:
          </Description>
          <MyList />
          <Description variant="body3">
            All Users must meet the following eligibility conditions
            (“Eligibility Conditions”) for as long as they use the Site: (a) you
            have and will at all times comply with all applicable laws and
            regulations; (b) you have the right, authority and capacity to enter
            into these Terms and to abide by all of the terms and conditions in
            these Terms; (c) neither you, nor anyone in your home: (i) has been
            the subject of a complaint, restraining order or any other legal
            action involving violence, abuse, neglect, fraud, larceny, or any
            offense that involves endangering the safety of others; (ii) has
            been convicted of a crime of any nature, including any felony or
            misdemeanor of any kind, including without limitation any sexual,
            child abuse or domestic violence offenses; and/or (iii) has been
            and/or is currently required to register as a sex offender in any
            jurisdiction or with any government entity; and (d) neither you, nor
            anyone in your home, is currently out on bail or on your own
            recognizance pending trial, relating to any felony or misdemeanor
            charges of any kind, including without limitation sexual, child
            abuse or domestic violence offenses.
          </Description>
          <Description variant="body3">
            Vulcan may revise the Eligibility Conditions from time to time and
            require new conditions and certifications. Continued use of the Site
            constitutes agreement with and acceptance of any new Eligibility
            Conditions and Users are required to abide by such revised
            Eligibility Conditions or discontinue using the Site.
          </Description>
          <Description variant="body3">
            Vulcan may verify the above representations and warranties.
            Verification may include, without limitation, conducting criminal
            background checks, sex offender registry checks, motor vehicle
            records checks, identification verifications, credit checks and/or
            use of available public records. You consent to any collection, use
            or disclosure in order to accomplish such verification. Vulcan may
            take such action as it, in its sole discretion, deems appropriate,
            including without limitation suspending and/or terminating your use
            of the Services, should it determine that you have violated any
            representation or warranty.
          </Description>
          <Description variant="body3">
            The preceding paragraph notwithstanding, Vulcan does not directly
            conduct background checks of any User. Vulcan neither confirms nor
            denies the validity of information provided by Users and Vulcan has
            no obligation to verify that any or all of the Eligibility
            Conditions are met by Users. Users are responsible for making their
            own decisions and assessments about persons to engage and that –{" "}
            <b>
              IT IS YOUR SOLE RESPONSIBILITY TO ORDER ANY AND ALL BACKGROUND AND
              REFERENCE CHECKS REGARDING OTHER USERS.
            </b>
          </Description>
          <Description variant="body3">
            Vulcan expressly disclaims, and you expressly release Vulcan from,
            any and all liability whatsoever for any controversies, claims,
            suits, injuries and/or damages arising from and/or in any way
            related to: (a) any inaccuracy, untimeliness or incompleteness
            regarding a User’s Eligibility Conditions and/or (b) misstatements
            or misrepresentations made by any User.
          </Description>
          <Description variant="body3">
            Vulcan reserves all of its rights under the Communications Decency
            Act, including without limitation its right to remove anything
            objectionable to Vulcan in its sole discretion. Alleged
            improprieties by any User may be reported to Vulcan by email at
            <PrivacyLinks>
              info@vulcanlearninginstitute.com
            </PrivacyLinks>
            .
          </Description>
          {/* ================================================================================================= */}

          <Title variant="h5"> 5. Third party reports</Title>
          <Description variant="body3">
            Vulcan may utilize third party consumer reporting agencies that
            perform, among other things, criminal background checks, sex
            offender registry checks, motor vehicle records checks, credit
            checks, and identification verifications (“consumer reports”).
            Vulcan does not endorse or make any representations or warranties
            regarding the reliability of such consumer reports or the accuracy,
            timeliness or completeness of any information in the consumer
            reports. Vulcan does not independently verify information in the
            consumer reports.
          </Description>
          <Description variant="body3">
            Vulcan may collect, use and disclose the information in the consumer
            reports. Vulcan may, in its sole discretion, review and rely on the
            information in the consumer reports in deciding whether to suspend
            or terminate a User or to investigate a complaint about a User, but
            Vulcan shall not be responsible or liable in any way in the event
            that any information in the consumer reports about any person,
            including without limitation any User, is not accurate, timely or
            complete. Users who are the subject of consumer reports may contact
            the service provider to dispute the accuracy, timeliness or
            completeness of such information. Vulcan reserves the right to
            suspend and/or terminate a User based on information in the consumer
            reports or for any other reason in Vulcan’s sole discretion.
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5">6. Confidentiality of Vulcan information </Title>
          <Description variant="body3">
            You may obtain direct access via the Site to certain confidential
            information of Vulcan and its affiliates, including without
            limitation technical, contractual, product, program, pricing,
            marketing and other valuable information that should reasonably be
            understood as confidential (“Confidential Information”). You must
            hold Confidential Information in strict confidence. All right, title
            and interest in the Confidential Information remains with Vulcan and
            its affiliates.
          </Description>
          <Description variant="body3">
            The Terms impose no obligation upon you with respect to Confidential
            Information that you can establish by legally sufficient evidence:
            (a) you possessed prior to your receipt from Vulcan, without an
            obligation to maintain its confidentiality; (b) is or becomes
            generally known to the public through no act or omission by you, or
            otherwise without violation of the Terms; (c) you obtained from a
            third party who had the right to disclose it, without an obligation
            to keep such information confidential; (d) you independently
            developed without the use of Confidential Information and without
            the participation of individuals who have had access to it, or (e)
            in response to a valid order by a court or other governmental body,
            or as otherwise required by law, or as necessary to establish the
            rights of either party under these Terms and as disclosed after
            prior notice to Vulcan adequate to afford Vulcan the opportunity to
            object to the disclosure.
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5"> 7. Content provided on the Site</Title>
          <Description variant="body3">
            Vulcan does not claim ownership of the Content that you provide on
            the website and shall have no obligation of any kind with respect to
            such Content. Unless otherwise stated herein, any Content that you
            provide in connection with this website shall be deemed to be
            provided on a non-confidential basis. Vulcan shall be free to use or
            disseminate such Content on an unrestricted basis for any purpose,
            and you grant Vulcan an irrevocable, worldwide, royalty-free,
            nonexclusive license to use, reproduce, modify, distribute,
            transmit, display, perform, adapt, resell and publish such Content
            (including in digital form). You represent and warrant that you have
            proper authorization for the worldwide transfer and processing among
            Vulcan, its affiliates, and third-party providers of any content
            that you may provide on the Site.
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5"> 8. Terms of transacting business</Title>
          <Description variant="body3">
            Users must abide by Vulcan’s instructor and student payment
            policies. Users must pay all costs associated with the services
            through Vulcan. These costs include but are not limited to: (a)
            course cost; (b) travel and transportation fees; (c) cancellation
            fees as described in a course's refund policy, which can be found on
            a course page on the Site;
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5"> 9. Third party verification services</Title>
          <Description variant="body3">
            Vulcan may make available one or more third party verification
            services that enable Users of the Site to inquire about information
            including, but not limited to, another User’s identity and criminal
            history. Use of a third party verification service is voluntary for
            both the party requesting the verification and the party undergoing
            the verification. You agree that Vulcan shall not be held
            responsible or liable in any way if any information provided by a
            third party verification service is inaccurate. When a third party
            verification service is used, you warrant that you will comply with
            the Fair Credit Reporting Act, 15 USC 1681. See
            <PrivacyLinks>
              http://www.consumer.ftc.gov/articles/pdf-0111-fair-credit-reporting-act.pdf{" "}
            </PrivacyLinks>
            for details.
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5"> 10. Advertisements and promotions</Title>
          <Description variant="body3">
            Vulcan may run advertisements and promotions from third parties on
            the Site. Your correspondence or business dealings with, or
            participation in promotions of, advertisers other than Vulcan, found
            on or through the Site, including payment and delivery of related
            goods or services, and any other terms, conditions, warranties or
            representations associated with such dealings, are solely between
            you and such advertiser. Vulcan is not responsible or liable for any
            loss or damage of any sort incurred as the result of any such
            dealings or as the result of the presence of such non-Vulcan
            advertisers on the Site.
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5">11. Content provided via links</Title>
          <Description variant="body3">
            You may find links to other websites or resources on the Site. You
            acknowledge and agree that Vulcan is not responsible for the
            availability of such external websites or resources, and does not
            endorse and is not responsible or liable for any content,
            advertising, products, or other materials on or available from such
            websites or resources. Vulcan will not be responsible or liable,
            directly or indirectly, for any actual or alleged damage or loss
            caused by or in connection with use of or reliance on any such
            content, goods or services available on or through any such site or
            resource.
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5">12. Intellectual property rights</Title>
          <Description variant="body3">
            Vulcan grants you permission (which may be revoked at any time for
            any reason or no reason) to use the Site for the purposes provided
            herein and in accordance with these Terms and solely for your own
            personal, non-commercial use (except as provided herein), provided
            you do not remove any trademark, copyright or other notice. No other
            use is permitted. You may not, for example, incorporate the
            information, content, or other material in any database,
            compilation, archive or cache. Except as specifically authorized by
            Vulcan, you may not deep-link to the Sitefor any purpose or access
            the Site manually or with any robot, spider, web crawler, extraction
            software, automated process or device to scrape, copy, or monitor
            any portion of the Site or any information, content, or material on
            the Site. Vulcan reserves all of its statutory and common law rights
            against any person or entity who violates this paragraph. You may
            not link or frame to any pages of the Site or any content contained
            therein, whether in whole or in part, without prior written consent
            from Vulcan. You may like or follow Vulcan or share links to the
            Site via social networking technology referenced on the Site. Any
            rights not expressly granted herein are reserved.
          </Description>
          <Description variant="body3">
            Except as expressly authorized by Vulcan or by Content providers,
            you agree not to reproduce, modify, rent, lease, loan, sell,
            distribute, mirror, frame, republish, download, transmit, or create
            derivative works of the Content of others, in whole or in part, by
            any means. You must not modify, decompile, or reverse engineer any
            software Vulcan discloses to you, and you must not remove or modify
            any copyright or trademark notice, or other notice of ownership.
          </Description>
          <Description variant="body3">
            “Vulcan Trademarks” means all names, marks, brands, logos, designs,
            trade dress, slogans and other designations Vulcan uses in
            connection with its products and services. You may not remove or
            alter any Vulcan Trademarks, or co-brand your own products or
            material with Vulcan Trademarks, without Vulcan’s prior written
            consent. You acknowledge Vulcan’s rights in Vulcan Trademarks and
            agree that any use of Vulcan Trademarks by you shall inure to
            Vulcan’s sole benefit. You agree not to incorporate any Vulcan
            Trademarks into your trademarks, service marks, company names,
            internet addresses, domain names, or any other similar designations,
            for use on or in connection with computer or internet-related
            products, services or technologies.
          </Description>
          <Description variant="body3">
            Unless explicitly stated herein, nothing in these Terms shall be
            construed as conferring any license to intellectual property rights.
            Permission is granted to display, copy, distribute and download
            Content owned by Vulcan on the Site provided that: (a) the copyright
            notice pertaining to the Content remains, and a permission notice
            (e.g., “used with permission”) is added to such Content; (b) the use
            of such Content is solely for personal and non-commercial use; (c)
            such Content will not be copied or posted on any networked computer
            or published in any medium, except as explicitly permitted by valid
            permission or license covering such materials; and (d) no
            modifications are made to such Content. This permission terminates
            automatically without notice if you breach any of the terms or
            conditions in this document. Upon termination, you must immediately
            destroy any downloaded and/or printed Content.
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5"> 13. Copyright Infringement</Title>
          <Description variant="body3">
            Vulcan respects the intellectual property of others, and we ask our
            Users to do the same. Accordingly, Users may not post, modify,
            distribute, or reproduce in any way any Content on the Site that is
            copyrighted material you do not own or have permission to use,
            without obtaining prior written consent of the copyright owner.
            Vulcan reserves the right, in its discretion, to remove any Content
            if we believe it may infringe the copyright rights of others, and/or
            to terminate the accounts of Users who we believe to be infringers.
          </Description>

          <Description variant="body3">
            If you believe that your work has been copied and posted on the Site
            in a way that constitutes copyright infringement, we will respond to
            notices of alleged infringement that comply with the Digital
            Millennium Copyright Act of 1998 (the “DMCA”), a federal law that
            provides recourse for copyright owners who believe that material
            appearing on the Internet infringes their rights under U.S.
            copyright law. If you believe in good faith that content or material
            hosted on the Site infringes your copyright, you (or your agent) may
            send Vulcan. a notice requesting that the content or material be
            removed, or access to it blocked. The notice must include the
            following information: (a) a physical or electronic signature of a
            person authorized to act on behalf of the owner of an exclusive
            right that is allegedly infringed; (b) identification of the
            copyrighted work claimed to have been infringed (or if multiple
            copyrighted works are covered by a single notification, a
            representative list of such works); (c) identification of the
            material that is claimed to be infringing or the subject of
            infringing activity, and information reasonably sufficient to allow
            Vulcan to locate the content or material within the Site; (d) the
            name, address, telephone number and email address (if available) of
            the complaining party; (e) a statement that the complaining party
            has a good faith belief that use of the content or material in the
            manner complained of is not authorized by the copyright owner, its
            agent or the law; and (f) a statement that the information in the
            notification is accurate and, under penalty of perjury, that the
            complaining party is authorized to act on behalf of the owner of an
            exclusive right that is allegedly infringed. If you believe in good
            faith that a notice of copyright infringement has been wrongly filed
            against you, the DMCA permits you to send us a counter-notice.
            Notices and counter-notices must meet the then-current statutory
            requirements imposed by the DMCA; see{" "}
            <PrivacyLinks>
              http://www.loc.gov/copyright
            </PrivacyLinks>
            {" "} for details. Vulcan’s agent for notice of claims of copyright or
            other intellectual property infringement can be reached as follows:
          </Description>
          
          <Description variant="body3">
            By email:{" "}<PrivacyLinks>info@vulcanlearninginstitute.com</PrivacyLinks> 
          </Description>
          <Description variant="body3">
            We suggest that you consult with a legal advisor before filing a
            notice under the DMCA. Also, be aware that there can be penalties
            for false claims under the DMCA.
          </Description>
          {/* ================================================================================================= */}

          <Title variant="h5"> 14. Termination and suspension</Title>
          <Description variant="body3">
            Vulcan reserves the right to suspend and/or terminate any User with
            or without notice at any time in its sole discretion, for any reason
            or no reason. You agree that, if you are suspended and/or
            terminated, you will make no further use of the Site after
            termination or during suspension.
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5"> 15. Disclaimer of warranties</Title>
          <Description variant="body3"></Description>
          <Description variant="body3">
            USE OF THE SITE IS AT YOUR SOLE RISK UNLESS OTHERWISE EXPLICITLY
            STATED. THE SITE, INCLUDING THE INFORMATION, SERVICES, AND CONTENT,
            IS PROVIDED ON AN “AS IS”, “AS AVAILABLE”, AND “WITH ALL FAULTS”
            BASIS. VULCAN DISCLAIMS ALL EXPRESS OR IMPLIED CONDITIONS,
            REPRESENTATIONS, AND WARRANTIES OF ANY KIND, INCLUDING ANY IMPLIED
            WARRANTY OR CONDITION OF MERCHANTABILITY, SATISFACTORY QUALITY, OR
            FITNESS FOR A PARTICULAR PURPOSE. VULCAN MAKES NO REPRESENTATIONS,
            WARRANTIES, CONDITIONS OR GUARANTEES AS TO THE USEFULNESS, QUALITY,
            SUITABILITY, TRUTH, ACCURACY, OR COMPLETENESS OF THE SITE.
          </Description>
          <Description variant="body3">
            VULCAN MAKES NO WARRANTY OR REPRESENTATIONS THAT: (A) THE SITE WILL
            BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (B) THE RESULTS
            THAT MAY BE OBTAINED FROM THE USE OF THE WEBSITE WILL BE ACCURATE OR
            RELIABLE; (C) THE QUALITY OF ANY PRODUCTS, SERVICES, CONTENT,
            INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED FROM
            INSTRUCTORS WILL MEET YOUR EXPECTATIONS OR REQUIREMENTS; (D) ANY
            ERRORS IN THE SITE WILL BE CORRECTED; OR THAT THE SERVICES ARE
            APPROPRIATE FOR USE OR ACCESS OUTSIDE OF THE UNITED STATES.
          </Description>
          <Description variant="body3">
            YOU ASSUME ALL RISK FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR DEVICE
            OR LOSS OF DATA THAT RESULTS FROM OBTAINING ANY CONTENT FROM THE
            SITE, INCLUDING ANY DAMAGES RESULTING FROM COMPUTER VIRUSES.
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5">16. Limitation of liability </Title>
          <Description variant="body3">
            THE SITE OFFERS A MARKETPLACE FOR THOSE SEEKING EDUCATIONAL SERVICES
            TO CONNECT WITH THOSE SEEKING TO PROVIDE EDUCATIONAL SERVICES.
          </Description>
          <Description variant="body3">
            YOU UNDERSTAND AND AGREE THAT VULCAN HAS NO CONTROL OVER THE ACTS OR
            OMISSIONS OF ANY USER ON OR OFF THE SITE AND THAT Vulcan MAKES NO
            REPRESENTATIONS OR WARRANTIES ABOUT THE QUALITY OF THE SERVICES
            PROVIDED BY ANY USER. YOU UNDERSTAND AND AGREE THAT Vulcan IS NOT
            RESPONSIBLE FOR THE PERFORMANCE OR CONDUCT, WHETHER ON OR OFF THE
            SITE, OF ANY USER. AS SUCH, Vulcan EXPRESSLY DISCLAIMS, AND EACH
            USER EXPRESSLY RELEASES Vulcan FROM, ANY AND ALL LIABILITY
            WHATSOEVER FOR ANY CONTROVERSIES, CLAIMS, SUITS, INJURIES AND/OR
            DAMAGES ARISING FROM AND/OR IN ANY WAY RELATED TO THE SITE,
            INCLUDING WITHOUT LIMITATION ANY ACTS AND/OR OMISSIONS OF USERS ON
            OR OFF THE SITE.
          </Description>
          <Description variant="body3">
            USERS OF THE SITE TRANSACT BETWEEN THEMSELVES. VULCAN WILL NOT BE
            INVOLVED IN ANY USER INTERACTIONS. VULCAN IS NOT RESPONSIBLE FOR
            DISPUTES, CLAIMS, LOSS, INJURY, OR DAMAGE OF ANY KIND THAT MIGHT
            ARISE DURING AND AFTER USER INTERACTION.
          </Description>
          <Description variant="body3">
            TO THE FULL EXTENT PERMITTED BY LAW, VULCAN IS NOT LIABLE FOR ANY
            DIRECT, INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR
            EXEMPLARY DAMAGES (INCLUDING WITHOUT LIMITATION LOSS OF BUSINESS,
            REVENUE, PROFITS, GOODWILL, USE, DATA, ELECTRONICALLY TRANSMITTED
            ORDERS, OR OTHER ECONOMIC ADVANTAGE) ARISING OUT OF OR IN CONNECTION
            WITH THE SITE, EVEN IF Vulcan HAS PREVIOUSLY BEEN ADVISED OF, OR
            REASONABLY COULD HAVE FORESEEN, THE POSSIBILITY OF SUCH DAMAGES,
            HOWEVER THEY ARISE, WHETHER IN BREACH OF CONTRACT OR IN TORT
            (INCLUDING NEGLIGENCE), INCLUDING WITHOUT LIMITATION DAMAGES DUE TO:
            (A) THE USE OF OR THE INABILITY TO USE THE SITE; (B) THE COST OR
            PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM ANY
            GOODS, DATA, INFORMATION, OR SERVICES PURCHASED OR OBTAINED, OR
            MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO, THROUGH OR FROM THE
            SITE; (C) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SITE,
            INCLUDING WITHOUT LIMITATION UNAUTHORIZED ACCESS TO OR ALTERATION OF
            TRANSMISSION OR DATA, MALICIOUS OR CRIMINAL BEHAVIOR, OR FALSE OR
            FRAUDULENT TRANSACTIONS; OR (D) CONTENT OR INFORMATION USERS MAY
            DOWNLOAD, USE, MODIFY, OR DISTRIBUTE. THESE LIMITATIONS SHALL APPLY
            NOTWITHSTANDING ANY FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED
            REMEDY. BECAUSE SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR
            LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE
            ABOVE LIMITATIONS MAY NOT APPLY TO YOU. IN NO EVENT SHALL Vulcan’S
            TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES AND CAUSES OF ACTION,
            WHETHER IN CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO, NEGLIGENCE)
            OR OTHERWISE, EXCEED (A) THE AMOUNT PAID BY YOU TO VULCAN OR A
            VULCAN PARTNER, IF ANY, OR (B) $100 (WHICHEVER IS LESS).
          </Description>
          <Description variant="body3">
            YOU AND VULCAN AGREE THAT THE WARRANTY DISCLAIMERS AND LIMITATIONS
            OF LIABILITY IN THESE TERMS ARE MATERIAL, BARGAINED-FOR BASES OF
            THIS AGREEMENT, AND THAT THEY HAVE BEEN TAKEN INTO ACCOUNT IN
            DETERMINING THE CONSIDERATION TO BE GIVEN BY EACH PARTY UNDER THIS
            AGREEMENT AND IN THE DECISION BY EACH PARTY TO ENTER INTO THIS
            AGREEMENT. YOU AND VULCAN AGREE THAT THE WARRANTY DISCLAIMERS AND
            LIMITATIONS OF LIABILITY IN THESE TERMS ARE FAIR AND REASONABLE.
          </Description>
          <Description variant="body3">
            IF YOU ARE DISSATISFIED WITH THE SITE OR DO NOT AGREE TO ANY
            PROVISIONS OF THESE TERMS, YOUR SOLE AND EXCLUSIVE REMEDY IS TO
            DISCONTINUE USING THE SITE, EXCEPT AS MAY BE PROVIDED FOR IN THIS
            SECTION 18.
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5">17. Assumption of risk</Title>
          <Description variant="body3">
            Users assume all risks when using the Site, including without
            limitation any and all of the risks associated with any online or
            offline interactions with other Users. Users shall take all
            necessary precautions when interacting with other Users.
          </Description>

          {/* ================================================================================================= */}

          <Title variant="h5">18. Indemnification</Title>
          <Description variant="body3">
            Users shall indemnify, defend, and hold harmless Vulcan and its
            subsidiaries, affiliates, shareholders, officers, directors, agents,
            licensors, suppliers, other partners, employees, and representatives
            from and against any and all claims, demands, causes of action,
            losses, expenses, damages and/or liabilities, including reasonable
            attorney’s fees and court costs, incurred by Vulcan in any way
            related to your (a) acts and/or omissions on or off the Site; (b)
            violation of any rights of another, including without limitation any
            alleged infringement of intellectual property or other right of any
            person or entity relating to the Site; (c) breach of these Terms;
            (d) disputes with or between other Users; (e) use and/or misuse of
            the Site, including without limitation any information, content
            and/or materials thereon; (f) violation of any applicable law or
            regulation; (g) inaccurate, untimely, incomplete or misleading User
            information, including without limitation with respect to
            registration, profile or eligibility; (h) misstatements and/or
            misrepresentations; (i) use of links to third party websites,
            including without limitation such websites’ availability, terms of
            use, privacy policy, information, content, materials, advertising,
            products and/or services; (j) User information and any acts or
            omissions with respect to such User information; (k) use of any
            information in third-party reports; (l) use of third party payment
            processing services; (m) use of phone support services; and/or (n)
            use of any services or products or any contracts or arrangements
            made or provided based on information, content and/or materials
            obtained on or through the Site. Users must cooperate as requested
            by Vulcan in the defense of such claims. Vulcan reserves the right,
            at its own expense, to assume the exclusive defense and control of
            any matter otherwise subject to indemnification by Users, and you
            shall not, in any event, settle any claim or matter on behalf of
            Vulcan without the written consent of Vulcan.
          </Description>

          {/* ================================================================================================= */}
          <Title variant="h5">19. Injunction</Title>
          <Description variant="body3">
            Notwithstanding the Arbitration terms set forth herein, Users agree
            that any material breach of the Terms will result in irreparable
            harm to Vulcan for which damages would be an inadequate remedy and,
            therefore, in addition to its rights and remedies otherwise
            available at law, Vulcan reserves the right to seek will equitable
            relief through the court system, including both a preliminary and
            permanent injunction, if such a breach occurs. You waive any
            requirement for the posting of a bond or other security if Vulcan
            seeks such an injunction.
          </Description>

          {/* ================================================================================================= */}
          <Title variant="h5">
            {" "}
            20. Notices; modification and termination of services; amendment of
            terms
          </Title>
          <Description variant="body3">
            Vulcan may provide notice to Users via email, regular mail, or
            posting notices or links to notices on the Site. Vulcan reserves the
            right at any time to modify, suspend or terminate the services (or
            any part thereof), and/or use of or access to them, with or without
            notice. Vulcan may also delete, or bar access to or use of, all
            related information and files. Vulcan will not be liable to Users or
            any third-party for any modification, suspension, or termination of
            service, or loss of related information. Vulcan may amend these
            Terms at any time by posting the amended terms on this Site.
          </Description>

          {/* ================================================================================================= */}
          <Title variant="h5"> 21. Entire agreement</Title>
          <Description variant="body3">
            These Terms constitute the entire agreement between you and Vulcan
            relating to their subject matter, and cancel and supersede any prior
            versions of the Terms. You may not assign or otherwise transfer the
            Terms or any right granted hereunder. You also may be subject to
            additional terms and conditions that may apply when you use Vulcan
            Site or third-party products or services.
          </Description>

          {/* ================================================================================================= */}
        </MainSubContainer>
      </MainContainer>
    </>
  );
}
