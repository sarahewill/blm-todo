const statuses = [{
    status: "open",
    icon: "⭕️",
    color: "#6feb46"
}, {
    status: "in progress",
    icon: "🔆️",
    color: "#00C2E0"
},{
    status: "done",
    icon: "✅",
    color: "#3981DE"
}];
const data = [
    { id: 1, icon: "⭕️", status: "in progress" , title: "Protest", content: "blah"},
    { id: 2, icon: "⭕️", status: "open" , title: "Educate", content: "blah"},
    { id: 3, icon: "⭕️", status: "open" ,title: "Fight Disinformation", content: "blah" },
    { id: 4, icon: "⭕️", status: "open",  title: "Support black-owned businesses", content: "blah" }
];

export { data, statuses }
