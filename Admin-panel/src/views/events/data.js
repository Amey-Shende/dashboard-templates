export const eventData = [
    {
        event_id: "12c99c64-2976-43fc-82f3-499133f3edb0",
        event_type: "Birthday",
        event_name: "Sheldon's 6th Birthday Party",
        event_creator: "0622be0e-5f3c-4456-a9f7-a690fa12cb86",
        event_for: [
            "4caca0b7-a1a9-49d9-b59d-c07d103d7d0e"
        ],
        event_host: "John's Parents",
        event_all_day: true,
        event_start_date: "2024-10-15",
        event_start_time: null,
        event_end_date: "2024-10-15",
        event_end_time: null,
        event_virtual_location: "Zoom Meeting Link",
        event_location: "123 Party Lane, Party City"
    },
    {
        event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        event_type: "Webinar",
        event_name: "Learning React Basics",
        event_creator: "12345678-abcd-ef12-3456-7890abcdef12",
        event_for: [
            "abcdef12-3456-abcd-7890-fedcba987654"
        ],
        event_host: "Tech Academy",
        event_all_day: false,
        event_start_date: "2024-11-01",
        event_start_time: "14:00",
        event_end_date: "2024-11-01",
        event_end_time: "15:30",
        event_virtual_location: "Google Meet Link",
        event_location: ""
    },
    {
        event_id: "f1e2d3c4-b5a6-7890-abcd-fedcba987654",
        event_type: "Conference",
        event_name: "Annual Tech Conference 2024",
        event_creator: "abcdef12-3456-abcd-7890-fedcba987654",
        event_for: [
            "12345678-abcd-ef12-3456-7890abcdef12"
        ],
        event_host: "Global Tech Corp.",
        event_all_day: true,
        event_start_date: "2024-09-20",
        event_start_time: null,
        event_end_date: "2024-09-22",
        event_end_time: null,
        event_virtual_location: "Virtual Conference Platform",
        event_location: "Convention Center, Tech City"
    },
    {
        event_id: "g1h2i3j4-k5l6-mnop-qrs-tuvwx1234567",
        event_type: "Workshop",
        event_name: "Photography Basics Workshop",
        event_creator: "09876543-abcd-fedc-ba98-765432109876",
        event_for: [
            "fedcba98-7654-3210-fedc-ba9876543210"
        ],
        event_host: "Creative Arts Studio",
        event_all_day: false,
        event_start_date: "2024-12-05",
        event_start_time: "10:00",
        event_end_date: "2024-12-05",
        event_end_time: "16:00",
        event_virtual_location: "",
        event_location: "456 Art St, Creative City"
    },
    {
        event_id: "h1i2j3k4-l5m6-nopq-rstuv-wxyz0987654",
        event_type: "Meeting",
        event_name: "Monthly Team Sync-up",
        event_creator: "56789012-fedc-ba98-lkjh-gfdsa0987654",
        event_for: [
            "qwertyui-opasdfgh-jklzxcvbnm-qwertyui"
        ],
        event_host: "Company Management Team",
        event_all_day: false,
        event_start_date: "2024-11-15",
        event_start_time: "09:00",
        event_end_date: "2024-11-15",
        event_end_time: "10:00",
        event_virtual_location: "",
        event_location: ""
    }
];

export const columns = [
    // {
    //     header: "Event ID",
    //     accessorKey: "event_id",
    //     cellStyle: { width: '300px' },
    // },
    {
        header: "Event Type",
        accessorKey: "event_type",
        cellStyle: { width: '200px' },
        enableSorting: true,
    },
    {
        header: "Event Name",
        accessorKey: "event_name",
        cellStyle: { width: '400px' },
        enableSorting: true,
    },
    {
        header: "Event Creator",
        accessorKey: "event_creator",
        cellStyle: { width: '300px' },
        enableSorting: true,
    },
    {
        header: "Event For",
        accessorKey: "event_for",
        cellStyle: { width: '250px' },
        enableSorting: true,
    },
    {
        header: "Event Host",
        accessorKey: "event_host",
        cellStyle: { width: '250px' },
        enableSorting: true,
    },
    {
        header: "All Day Event",
        accessorKey: "event_all_day",
        cellStyle: { width: '150px' },
        enableSorting: true,
    },
    {
        header: "Start Date",
        accessorKey: "event_start_date",
        cellStyle: { width: '200px' },
        enableSorting: true,
    },
    {
        header: "Start Time",
        accessorKey: "event_start_time",
        cellStyle: { width: '150px' },
        enableSorting: true,
    },
    {
        header: "End Date",
        accessorKey: "event_end_date",
        cellStyle: { width: '200px' },
        enableSorting: false,
    },
    {
        header: "End Time",
        accessorKey: "event_end_time",
        cellStyle: { width: '150px' },
        enableSorting: false,
    },
    {
        header: "Virtual Location",
        accessorKey: "event_virtual_location",
        cellStyle: { width: '300px' },
        enableSorting: false,
    },
    {
        header: "Physical Location",
        accessorKey: "event_location",
        cellStyle: { width: '300px' },
        enableSorting: false,
    }
];