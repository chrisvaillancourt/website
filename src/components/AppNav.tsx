import AppList from "./AppList";
export default function AppNav() {
  const items = [
    { title: "Posts", link: "./posts" },
    { title: "About", link: "./about" },
    { title: "Contact", link: "./contact" },
  ];

  return (
    <nav>
      <AppList items={items} />
    </nav>
  );
}
