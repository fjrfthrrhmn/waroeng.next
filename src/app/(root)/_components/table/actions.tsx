import { DataTableFilter } from "@/components/custom/table/data-table-filter";
import { DataTableSort } from "@/components/custom/table/data-table-sort";
import { FilterIcon, PlusIcon } from "lucide-react";
import { FormAddProduct } from "../Form";
import { DataTableDrawer } from "@/components/custom/table/data-table-drawer";

export const productActions = [
  {
    label: "Tambah Data Baru",
    component: () => {
      return (
        <DataTableDrawer
          key={'add-data'}
          icon={<PlusIcon />}
          title="Tambah Data Baru"
          description="Form untuk menambahkan data baru ke dalam tabel."
        >
          <FormAddProduct />
        </DataTableDrawer>
      );
    },
  },
  {
    label: "Filter",
    component: () => {
      return (
        <DataTableDrawer
          key={'filter'}
          variant="default"
          icon={<FilterIcon />}
          title="Pengaturan Tampilan Tabel"
          description="Sesuaikan urutan, filter, dan kriteria data yang ditampilkan."
        >
          <>
            <DataTableSort />
            <DataTableFilter />
          </>
        </DataTableDrawer>
      );
    },
  },
];
