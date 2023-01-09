import getAnimalsKilledToDate from "../helpers/getAnimalsKilledToDate";

export default function Head({ params }: { params: { slug: string } }) {
  const killed = getAnimalsKilledToDate();
  console.log(killed);
  return (
    <>
      <title>
        {killed} Animals killed for food this year | killedsofar.org
      </title>
      <meta content="text/html;charset=utf-8" http-equiv="Content-Type" />
      <meta content="utf-8" http-equiv="encoding" />
      <meta
        name="description"
        content={`A real-time counter showing the number of animals killed so far (${Math.round(
          killed
        ).toLocaleString("en-US")}) this year for food.`}
      />
      <meta property="og:url" content="https://killedsofar.org" />
      <meta
        property="og:description"
        content={`A real-time counter showing the number of animals killed so far (${Math.round(
          killed
        ).toLocaleString("en-US")}) this year for food.`}
      />
      <meta
        property="og:title"
        content={`How many animals have been killed so far this year for food? Answer: ${Math.round(
          killed
        ).toLocaleString("en-US")} as of ${new Date().toLocaleString("en-US")}`}
        id="meta-title"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="http://killedsofar.org/images/Piglet.jpg"
      />

      <meta property="fb:app_id" content="567092209977627" />
    </>
  );
}
