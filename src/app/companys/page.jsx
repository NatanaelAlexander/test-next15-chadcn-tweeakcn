
import { data } from "@/fetchs/useToCompanys";
import { DataTable } from "@/components/app/companys/DataTable";
import { Building2 } from "lucide-react";

export default function Home() {

    return (
        <div className="space-y-6 bg-[#1A1A1A] min-h-screen p-6">

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Building2 className="h-8 w-8 text-blue-600" />
                    <div>
                        <h1 className="text-2xl font-bold text-white">Empresas</h1>
                        <p className="text-sm text-gray-300">
                            Gestiona y visualiza información de empresas
                        </p>
                    </div>
                </div>
            </div>

            <DataTable data={data} />
        </div>
    );
}