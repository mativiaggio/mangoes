interface Props {
  data: { name: string; email: string };
}

export default function AdminPage({ data }: Props) {
  console.log(data);
  return <></>;
}
