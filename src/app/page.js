import VisitorsCharts from "@/components/app/home/VisitorsCharts";

export default function Home() {
  return (
    <div className="grid lg:grid-cols-3 lg:gap-20 lg:px-20 place-content-center w-full">
      <VisitorsCharts label='Ejemplo 1' visitors={123}></VisitorsCharts>
      <VisitorsCharts label='Ejemplo 2' visitors={456}></VisitorsCharts>
      <VisitorsCharts label='Ejemplo 3' visitors={789}></VisitorsCharts>
    </div>
  );
}
