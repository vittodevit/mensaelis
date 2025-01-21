// pages/index.tsx

type MenuItemType = {
  glutenFree: boolean;
  lactoseFree: boolean;
  name: string;
  ingredientiAllergeni: string[];
  ingredienti: string[];
};

type SectionType = {
  title: string;
  items: MenuItemType[];
};

export const revalidate = 60
export const dynamicParams = true 

async function getMenuData(): Promise<SectionType[]> {
  const res = await fetch('https://elisapi.vitto.dev/getElisMenu/json');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const Home = async () => {
  const menuData = await getMenuData();
  return (
      <main className="flex-grow p-4 bg-gray-800">
        {menuData.map((section) => (
          <Section key={section.title} section={section} />
        ))}
      </main>
  );
};

const Section = ({ section }: { section: SectionType }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
    {section.items.map((item, index) => (
      <MenuItem key={index} item={item} />
    ))}
  </div>
);

const MenuItem = ({ item }: { item: MenuItemType }) => (
  <div className="border border-gray-300 rounded-lg p-4 mb-4">
    <h3 className="text-lg font-medium mb-2">{item.name}</h3>
    <p><strong>Gluten Free:</strong> {item.glutenFree ? 'Yes' : 'No'}</p>
    <p><strong>Lactose Free:</strong> {item.lactoseFree ? 'Yes' : 'No'}</p>
    <p><strong>Ingredienti:</strong> {item.ingredienti.join(', ') || 'N/A'}</p>
    <p><strong>Ingredienti Allergeni:</strong> {item.ingredientiAllergeni.join(', ') || 'N/A'}</p>
  </div>
);

export default Home;
