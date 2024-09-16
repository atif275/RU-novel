import React from 'react';
import { useSelector } from 'react-redux';

function AuthorAdd() {

  const theme=useSelector((state)=>state.userData.theme)

  return (
    <div className={`lg:w-[90%] lg:ml-20 h-full p-4  ${theme === 'dark' ? 'bg-[#181818]' : 'bg-[#f3f6f9] '}`}>
      <img src="https://i.imgur.com/wzJJomG.png" alt="" className="mb-4" />

      {/* Container for Billboard, Leaderboard, and Rectangle */}
      <div className={`rounded-md p-4   ${theme === 'dark' ? 'bg-[#131313] text-[#FFFFFFCC]' : 'bg-white border border-gray-300  '}`}>
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 items-center">
          {/* Home Billboard */}
          <div className={`w-full md:w-[300px] h-[250px] flex flex-col items-center justify-center border border-black ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-gray-100  '}`} >
            <h3 className="text-center text-sm">
              Home Billboard
              <br />
              (1200 x 400)
            </h3>
          </div>

          {/* Leaderboard */}
          <div className={`w-full md:w-[300px] h-[250px] flex flex-col items-center justify-center  border border-black ${theme === 'dark' ? 'bg-[#131313] text-[#FFFFFFCC]' : 'bg-gray-100  '}`}>
            <h3 className="text-center text-sm">
              Leaderboard
              <br />
              (728 x 90)
            </h3>
            <p className="text-center text-xs mt-2">
              140,250 - 280,500 Impressions for $55 <br />
              263,500 - 527,000 Impressions for $100 <br />
              467,000 - 938,000 Impressions for $165 <br />
              850,000 - 1,700,000 Impressions for $275
            </p>
          </div>

          {/* Rectangle Section */}
          <div className={`w-full md:w-[300px] h-[250px] flex flex-col items-center justify-center  border border-black ${theme === 'dark' ? 'bg-[#131313] text-[#FFFFFFCC]' : 'bg-gray-100   '}`}>
            <h3 className="text-center text-sm">
              Rectangle
              <br />
              (300 x 250)
            </h3>
            <p className="text-center text-xs mt-2">
              140,250 - 280,500 Impressions for $55 <br />
              263,500 - 527,000 Impressions for $100 <br />
              467,000 - 938,000 Impressions for $165 <br />
              850,000 - 1,700,000 Impressions for $275
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <p className="mt-4">
          <strong>How to start a campaign?</strong>
        </p>
        <p className="mt-2">
          You can start an internal RU Novel Advertising Campaign in your Author Dashboard &gt; Left side menu [Advertising]. There are Leaderboard and rectangular advertisement campaigns available at the moment.
        </p>
        <p className="mt-2">
          You can find the pricing by clicking [New Campaign] and scrolling to the bottom of the page.
        </p>
        <p className="mt-2">
          If you wish to advertise a RU Novel novel, you can enjoy our discounted prices for paid advertisements. This offer is limited to stories that are fully available on RU Novel. If you are not promoting a RU Novel link with a novel that is fully available on the platform, or if you are a publisher, then note that the normal pricing is still a great value. We are just being extra generous with the discount.
        </p>

        <p className="mt-4">
          <strong>How long is the approval period?</strong>
        </p>
        <p className="mt-2">
          Every ad that is submitted requires approval from staff; you can schedule an advertisement in advance. But, if you choose to promote it immediately, it can take up to 24 hours.
        </p>

        <p className="mt-4">
          <strong>Which content can be promoted?</strong>
        </p>
        <p className="mt-2">
          We welcome advertisements for content available on RU Novel or platforms such as Amazon's online store. While we do not rule out the possibility of considering other platforms in the future, we won't accept advertisements for platforms that compete with RU Novel.
        </p>
        <p className="mt-2">
          If you want to link your ad to another site that was not mentioned above, please beware that it is possible that we will reject it. So feel free to reach out in a support ticket before designing the ad.
        </p>

        <p className="mt-4">
          <strong>Which ads are likely to be rejected?</strong>
        </p>
        <p className="mt-2">
          Any ad design with NSFW (Not Safe For Work) content, such as mature or sexualized characters, or any ad that does not follow good ad design practices.
        </p>
        <p className="mt-2">
          Ads that feature content that is suggestive or sexually suggestive in nature, even if it does not explicitly depict sexual acts or nudity, are prohibited. This includes but is not limited to images or scenes that involve individuals engaging in actions or poses that may be perceived as sexually suggestive, as well as content that makes users uncomfortable or creates a sexually suggestive atmosphere.
        </p>
        <p className="mt-2">
          Links that directly lead to the first chapter of a stubbed fiction. You can, however, link to the fiction page.
        </p>

        <p className="mt-4">
          <strong>What is a good Ad design practice?</strong>
        </p>
        <p className="mt-2">
          You must include a note notifying the users that the campaign is for content not on RU Novel.
        </p>
        <p className="mt-2">
          Your campaign image needs to inform our readers that it is an Amazon ad and not an ad for a free web fiction on RU Novel. By doing this, our readers won't suddenly be sent off-site when they are not interested. And assures you that those clicking the ad are doing so with the purpose of checking a book on Amazon and thus are more likely to convert into readers/buyers over there. You can add a note stating it is [Available at Amazon] using Amazon's templates.
        </p>
        <p className="mt-2">
          As an example, download the file called [Available at Amazon Lockup Download (US)] which you can find here.
        </p>
        <p className="mt-2">
          Then you must open the folder [Available_at_Amazon_En] &gt; [Screen RGB PNG]. There you will find multiple horizontal and vertical options, which you can easily paste on your novel's ad image.
        </p>

        <p className="mt-4">
          <strong>How to set up a Universal Amazon Link?</strong>
        </p>
        <p className="mt-2">
          When you create an ad campaign for Amazon, the link will automatically be set to universal, which follows this scheme: 
        </p>

        <p className="mt-4">
          <strong>What is an Ad Impression?</strong>
        </p>
        <p className="mt-2">
          An impression counts every time the ad is served.
        </p>

        <p className="mt-4">
          <strong>What are the payment options?</strong>
        </p>
        <p className="mt-2">
          By using our automated system, you can pay with PayPal. You can also contact us directly to arrange for a direct invoice, which only requires a debit or credit card. The ad will be approved only after the payment is approved by you, so please make sure to complete the payment process. However, the payment will not be complete until the ad is approved. Meaning, you will not be charged until our team has verified and approved your campaign.
        </p>

        <p className="mt-4">
          <strong>Contact Information</strong>
        </p>
        <p className="mt-2">
          If you have any questions, you can contact us via a <a href="/support/ticket" className="text-blue-500">Support Ticket</a>.
        </p>
      </div>
    </div>
  );
}

export default AuthorAdd;