import getAnimalsKilledToDate from "../helpers/getAnimalsKilledToDate";

export default function Head({ params }: { params: { slug: string } }) {
  const killed = getAnimalsKilledToDate();
  const title = `How many animals have been killed so far this year for food? Answer: ${Math.round(
    killed
  ).toLocaleString("en-US")} as of ${new Date().toLocaleString("en-US")}`;
  const description = `A real-time counter showing the number of animals killed so far (${Math.round(
    killed
  ).toLocaleString("en-US")}) this year for food.'`;
  const ogImage = "https://killedsofar.org/images/Cutepiglet.jpg";
  return (
    <>
      <title>
        {killed} Animals killed for food this year | killedsofar.org
      </title>
      <meta content="text/html;charset=utf-8" http-equiv="Content-Type" />
      <meta content="utf-8" http-equiv="encoding" />
      <meta name="description" content={description} />
      <meta property="og:url" content="https://killedsofar.org" />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} id="meta-title" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@killedsofar" />
      <meta property="twitter:creator" content="@killedsofar" />
      <meta property="fb:app_id" content="567092209977627" />
    </>
  );
}
