import { BarChart, Bar, XAxis, Yaris, Tooltip, YAxis} from "recharts";

export default function Dashboard({ data}){
    return(
        <BarChart
            width={500}
            height={300}
            data={data}
        >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
        </BarChart>
    )
}