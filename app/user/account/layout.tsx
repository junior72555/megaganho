export default function Layout(props: {
  profile: React.ReactNode;
  pix: React.ReactNode;
}) {
  return (
    <>
      {props.profile}
      {props.pix}
    </>
  );
}