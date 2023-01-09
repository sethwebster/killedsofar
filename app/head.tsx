import getAnimalsKilledToDate from "../helpers/getAnimalsKilledToDate";

export default function Head({ params }: { params: { slug: string } }) {
  const killed = getAnimalsKilledToDate();
  console.log(killed)
  return (
    <>
      <title>{killed} Animals killed for food this year | killedsofar.org</title>
    </>
  );
}