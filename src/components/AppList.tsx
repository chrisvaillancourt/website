import { For } from "solid-js";
interface item {
  title: string;
  link: string;
}
export default function AppList({ items }: { items: item[] }) {
  return (
    <ul>
      <For each={items}>
        {({ title, link }, i) => (
          <li>
            <a href={link}>{title}</a>
          </li>
        )}
      </For>
    </ul>
  );
}
