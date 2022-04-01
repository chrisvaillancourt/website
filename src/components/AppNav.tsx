import AppList from "./AppList";
export default function AppNav() {
  const items = [
    { title: "test", link: "#" },
    { title: "test", link: "#" },
    { title: "test", link: "#" },
  ];

  return (
    <nav>
      <AppList items={items} />
    </nav>
  );
}
