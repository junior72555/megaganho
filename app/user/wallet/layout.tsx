export default function Layout(props: {
  badges: React.ReactNode;
  transaction: React.ReactNode;
}) {
  return (
    <>
      {props.badges}
      {props.transaction}
    </>
  );
}