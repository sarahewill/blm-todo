const statuses = [{
    status: "open",
    icon: "⭕️",
    color: "#EB5A46"
}, {
    status: "in progress",
    icon: "🔆️",
    color: "#00C2E0"
}, {
    status: "in review",
    icon: "📝",
    color: "#C377E0"
}, {
    status: "done",
    icon: "✅",
    color: "#3981DE"
}];
const data = [
    { id: 1, icon: "⭕️", status: "open" , title: "Eat", content: "blah"},
    { id: 2, icon: "⭕️", status: "open" , title: "Sleep", content: "blah"},
    { id: 3, icon: "⭕️", status: "open" ,title: "Wash", content: "blah" },
    { id: 4, icon: "⭕️", status: "open",  title: "Dance", content: "blah" }
];

export { data, statuses }
