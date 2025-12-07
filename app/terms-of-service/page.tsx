import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | AIWebHub',
  description: 'Terms of Service for AIWebHub - Read our terms and conditions for using our services.',
  alternates: {
    canonical: '/terms-of-service',
  },
}

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6 max-w-4xl bg-white rounded-lg shadow-lg my-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Terms of Service</h1>
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
          <p>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p className="mt-4">
            Welcome to AIWebHub. These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>
          <p className="mt-2">
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use AIWebHub's website if you do not agree to all of the terms and conditions stated on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these terms, AIWebHub and/or its licensors own all the intellectual property rights and materials contained in this website.
          </p>
          <p className="mt-2">
            You are granted a limited license only for purposes of viewing the material contained on this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Restrictions</h2>
          <p>You are specifically restricted from all of the following:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Publishing any website material in any other media</li>
            <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
            <li>Publicly performing and/or showing any website material</li>
            <li>Using this website in any way that is or may be damaging to this website</li>
            <li>Using this website in any way that impacts user access to this website</li>
            <li>Using this website contrary to applicable laws and regulations, or in any way may cause harm to the website, or to any person or business entity</li>
            <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this website</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Content</h2>
          <p>
            In these terms and conditions, "Your Content" shall mean any audio, video, text, images or other material you choose to display on this website. By displaying Your Content, you grant AIWebHub a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
          </p>
          <p className="mt-2">
            Your Content must be your own and must not be invading any third-party's rights. AIWebHub reserves the right to remove any of Your Content from this website at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">No Warranties</h2>
          <p>
            This website is provided "as is," with all faults, and AIWebHub expresses no representations or warranties, of any kind related to this website or the materials contained on this website.
          </p>
          <p className="mt-2">
            Nothing contained on this website shall be interpreted as advising you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p>
            In no event shall AIWebHub, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract. AIWebHub, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
          <p>
            You hereby indemnify to the fullest extent AIWebHub from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Severability</h2>
          <p>
            If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Variation of Terms</h2>
          <p>
            AIWebHub is permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review these terms on a regular basis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Assignment</h2>
          <p>
            AIWebHub is allowed to assign, transfer, and subcontract its rights and/or obligations under these terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Entire Agreement</h2>
          <p>
            These terms constitute the entire agreement between AIWebHub and you in relation to your use of this website, and supersede all prior agreements and understandings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Governing Law & Jurisdiction</h2>
          <p>
            These terms will be governed by and interpreted in accordance with the laws of the United States, and you submit to the non-exclusive jurisdiction of the state and federal courts located in the United States for the resolution of any disputes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul className="mt-2">
            <li>By email: aiwebcraftinfo@gmail.com</li>
            <li>By phone: +1 (734) 341-6746</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 