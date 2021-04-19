import { useIntl, FormattedMessage } from "react-intl";
import Head from "next/head";
import styles from "../styles/PrivacyPolicy.module.css";

export default function TermsAndConditions() {
  const Intl = useIntl();

  // TRANSLATIONS
  const translatedHead = Intl.formatMessage({
    id: "page.privacy.head.title",
    defaultMessage: "Privacy policy",
  });

  return (
    <>
      <Head>
        <title>{translatedHead}</title>
      </Head>
      <main className={styles.privacyPolicyPage}>
        <h1>
          <FormattedMessage
            id="page.privacy.page.title"
            defaultMessage="Privacy Policy for EasyFlow"
          />
        </h1>

        <p>
          <FormattedMessage
            id="page.privacy.paragraph1"
            defaultMessage="At EasyFlow, accessible from www.easyflow.ai, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by EasyFlow and how we use it."
          />
        </p>

        <p>
          <FormattedMessage
            id="page.privacy.paragraph2"
            defaultMessage="If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us."
          />
        </p>

        <p>
          <FormattedMessage
            id="page.privacy.paragraph3"
            defaultMessage="This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in EasyFlow. This policy is not applicable to any information collected offline or via channels other than this website."
          />
        </p>

        <h2>
          <FormattedMessage
            id="page.privacy.consent.title"
            defaultMessage="Consent"
          />
        </h2>

        <p>
          <FormattedMessage
            id="page.privacy.consent.par1"
            defaultMessage="By using our website, you hereby consent to our Privacy Policy and agree to its terms."
          />
        </p>

        <h2>
          <FormattedMessage
            id="page.privacy.informationWeCollect.title"
            defaultMessage="Information we collect"
          />
        </h2>

        <p>
          <FormattedMessage
            id="page.privacy.informationWeCollect.par1"
            defaultMessage="The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information."
          />
        </p>
        <p>
          <FormattedMessage
            id="page.privacy.informationWeCollect.par2"
            defaultMessage="If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide."
          />
        </p>
        <p>
          <FormattedMessage
            id="page.privacy.informationWeCollect.par3"
            defaultMessage="When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email."
          />
        </p>

        <h2>
          <FormattedMessage
            id="page.privacy.howWeuseInformation"
            defaultMessage="How we use your information"
          />
        </h2>

        <p>
          <FormattedMessage
            id="page.privacy.howWeuseInformation.intro"
            defaultMessage="We use the information we collect in various ways, including to:"
          />
        </p>

        <ul>
          <li>
            <FormattedMessage
              id="page.privacy.howWeuseInformation.li1"
              defaultMessage="Provide, operate, and maintain our website"
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.howWeuseInformation.li2"
              defaultMessage="Improve, personalize, and expand our website"
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.howWeuseInformation.li3"
              defaultMessage="Understand and analyze how you use our website"
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.howWeuseInformation.li4"
              defaultMessage="Develop new products, services, features, and functionality"
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.howWeuseInformation.li5"
              defaultMessage="Communicate directly with you, including for customer service, to provide you with updates and other information relating to the website"
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.howWeuseInformation.li6"
              defaultMessage="Find and prevent fraud"
            />
          </li>
        </ul>

        <h2>
          <FormattedMessage
            id="page.privacy.logFiles.title"
            defaultMessage="Log Files"
          />
        </h2>

        <p>
          <FormattedMessage
            id="page.privacy.logFiles.par1"
            defaultMessage="EasyFlow follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information."
          />
        </p>

        <h2>
          <FormattedMessage
            id="page.privacy.GDPR.title"
            defaultMessage="GDPR Data Protection Rights"
          />
        </h2>
        <ul>
          <li>
            <FormattedMessage
              id="page.privacy.GDPR.par1"
              defaultMessage="We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:"
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.GDPR.par2"
              defaultMessage="The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service."
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.GDPR.par3"
              defaultMessage="The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete."
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.GDPR.par4"
              defaultMessage="The right to erasure – You have the right to request that we erase your personal data, under certain conditions."
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.GDPR.par5"
              defaultMessage="The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions."
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.GDPR.par6"
              defaultMessage="The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions."
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.GDPR.par7"
              defaultMessage="The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions."
            />
          </li>
          <li>
            <FormattedMessage
              id="page.privacy.GDPR.par8"
              defaultMessage="If you make a request, we have one month to respond to you. If you  would like to exercise any of these rights, please contact us."
            />
          </li>
        </ul>
      </main>
    </>
  );
}
