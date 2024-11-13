import { ref, onBeforeMount } from 'vue';
import type {
    DataTableStateEvent,
    DataTableSortEvent,
    DataTableFilterEvent,
    DataTablePageEvent,
    DataTableFilterMetaData,
} from "primevue/datatable";
import { FilterMatchMode } from "@primevue/core/api";
import { useDateFormat } from '@vueuse/core'

export function useTable(columnsList: any[], tableName: string, filterList?: Ref<Record<string, DataTableFilterMetaData>>) {
    const columns = ref(columnsList);
    const selectedColumns = ref([...columns.value]);

    const tableState = ref(null)

    const OPTIONS: TableOptions = reactive({
        PageIndex: 0,
        PageSize: 10,
        SortColumn: "",
        SortOrder: "",
        FilterColumns: undefined,
        FilterQueries: undefined,
        TotalCount: 0,
        TotalPages: 0,
    });

    const DATA_TABLE_COLUMN_TOGGLE = `${tableName}_DataTable_ColumnToggle`
    const DATA_TABLE_STATE = `${tableName}_DataTable_State`
    const DATA_TABLE_OPTIONS = `${tableName}_DataTable_Options`

    const onToggle = (val: any[]) => {
        if (val.length > 0) {
            selectedColumns.value = columns.value.filter((col) => val.includes(col));
            onStateSave()
            updateFilters()
            restoreState()
        }
    };

    const onStateSave = () => {
        localStorage.setItem(DATA_TABLE_COLUMN_TOGGLE, JSON.stringify(selectedColumns.value));
        const state = localStorage.getItem(DATA_TABLE_STATE);
        tableState.value = JSON.parse(state!)
    };


    const updateFilters = () => {
        const stateStorage = localStorage.getItem(DATA_TABLE_STATE);
        if (stateStorage) {
            const parsedFilters = JSON.parse(stateStorage);
            parsedFilters.filters = filterList?.value
            localStorage.setItem(DATA_TABLE_STATE, JSON.stringify(parsedFilters));
            tableState.value = parsedFilters
        }
    }

    const restoreState = () => {
        const savedToggleState = localStorage.getItem(DATA_TABLE_COLUMN_TOGGLE);
        if (savedToggleState) {
            const restoredColumns = JSON.parse(savedToggleState);
            selectedColumns.value = columns.value.filter((col) =>
                restoredColumns.some((savedCol: any) => savedCol.field === col.field && savedCol.field !== 'value')
            );
        }
        const savedState = localStorage.getItem(DATA_TABLE_STATE);
        if (savedState) {
            const restoredColumns = JSON.parse(savedState);
            OPTIONS.PageSize = restoredColumns.rows as number;
        }
        const savedOptions = localStorage.getItem(DATA_TABLE_OPTIONS);
        if (savedOptions) {
            const restoredOPTIONS = JSON.parse(savedOptions) as typeof OPTIONS;
            OPTIONS.FilterColumns = restoredOPTIONS.FilterColumns;
            OPTIONS.FilterQueries = restoredOPTIONS.FilterQueries;
            OPTIONS.PageIndex = restoredOPTIONS.PageIndex;
            OPTIONS.PageSize = restoredOPTIONS.PageSize;
            OPTIONS.SortColumn = restoredOPTIONS.SortColumn;
            OPTIONS.SortOrder = restoredOPTIONS.SortOrder;
            OPTIONS.TotalCount = restoredOPTIONS.TotalCount;
            OPTIONS.TotalPages = restoredOPTIONS.TotalPages;
        }
    };

    const onSort = async (event: DataTableSortEvent, executeCall: () => Promise<void>) => {
        switch (event.sortOrder) {
            case 1:
                OPTIONS.SortOrder = "ASC";
                break;
            case -1:
                OPTIONS.SortOrder = "DESC";
                break;
            default:
                OPTIONS.SortOrder = "";
                break;
        }

        OPTIONS.SortColumn = event.sortField as string;
        OPTIONS.PageSize = event.rows;
        await executeCall();
    };

    const onPage = async (event: DataTablePageEvent, executeCall: () => Promise<void>) => {
        OPTIONS.PageIndex = event.page;
        OPTIONS.PageSize = event.rows;
        localStorage.setItem(DATA_TABLE_OPTIONS, JSON.stringify(OPTIONS));
        await executeCall();
    };

    const setOptionsFilters = (filters: Record<string, DataTableFilterMetaData>) => {
        const noNullFilters = Object.entries(filters)
            .filter(([_, filter]) => filter.value !== null && filter.value !== '')
            .reduce((acc, [key, filter]) => {
                acc[key] = filter;
                return acc;
            }, {} as Record<string, DataTableFilterMetaData>);
        OPTIONS.FilterColumns = Object.keys(noNullFilters) as string[];
        OPTIONS.FilterQueries = Object.values(noNullFilters).map((filter, index) => {
            const indexTarifa = OPTIONS.FilterColumns?.indexOf('Tarifa');
            const indexEstado = OPTIONS.FilterColumns?.indexOf('Estado');
            const indexComision = OPTIONS.FilterColumns?.indexOf('TipoComision');
            if (index == indexTarifa) {
                return filter.value.Nombre;
            }
            if (index == indexEstado) {
                return filter.value.Texto;
            }
            if (index == indexComision) {
                return filter.value.Id;
            } else {
                return filter.value;
            }
        }) as string[];
    };

    const onFilter = async (event: DataTableFilterEvent, tabla: any, executeCall: () => Promise<void>) => {
        const filters = event.filters as Record<string, DataTableFilterMetaData>;
        setOptionsFilters(filters);
        OPTIONS.PageIndex = tabla.value.first / tabla.value.rows;
        await executeCall();
    };

    const onDateSelect = (filterModel: DataTableFilterMetaData, date: Date, filterCallback: Function) => {
        filterModel.value = useDateFormat(date, 'DD/MM/YYYY');
        filterCallback();
    };

    const saveTableOptions = () => {
        localStorage.setItem(DATA_TABLE_OPTIONS, JSON.stringify(OPTIONS));
    }

    return {
        columns,
        selectedColumns,
        tableState,
        OPTIONS,
        DATA_TABLE_STATE,
        DATA_TABLE_COLUMN_TOGGLE,
        onToggle,
        onStateSave,
        restoreState,
        onSort,
        onPage,
        onFilter,
        onDateSelect,
        saveTableOptions,
        setOptionsFilters
    };
}
