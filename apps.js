// Tabs
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Budget calculator
const fmt = v => "₹" + Number(v).toLocaleString("en-IN");
document.getElementById("calcBudget").addEventListener("click", () => {
  const allowance = +document.getElementById("allowance").value || 0;
  const fixed = +document.getElementById("fixed").value || 0;
  const goal = +document.getElementById("goal").value || 0;
  const variable = Math.max(allowance - fixed - goal, 0);
  const food = Math.round(variable * 0.35);
  const travel = Math.round(variable * 0.20);
  const study = Math.round(variable * 0.25);
  const fun = variable - food - travel - study;

  document.getElementById("budgetResult").innerHTML =
    `<strong>Total variable:</strong> ${fmt(variable)}<br/>
     Food: ${fmt(food)} · Travel: ${fmt(travel)} · Study: ${fmt(study)} · Fun: ${fmt(fun)}`;

  const smart = [];
  if (goal > 0) smart.push(`Auto-save ${fmt(goal)} on day-1 to separate vault`);
  if (fixed/allowance > 0.5) smart.push(`High fixed costs: aim to reduce by 10% next month`);
  if (variable < 1000) smart.push(`Low free cash: consider a small part-time income`);
  document.getElementById("smartList").innerHTML = smart.map(s => `<li>${s}</li>`).join("") || "<li>No suggestions yet.</li>";
});

// Split calculator
document.getElementById("calcSplit").addEventListener("click", () => {
  const bill = +document.getElementById("bill").value || 0;
  const people = Math.max(+document.getElementById("people").value || 1, 1);
  const tip = +document.getElementById("tip").value || 0;
  const total = bill * (1 + tip/100);
  const each = total / people;
  document.getElementById("splitResult").textContent = `Total ${fmt(total.toFixed(2))} → Each pays ${fmt(each.toFixed(2))}`;
});

// Goals
const goals = [];
document.getElementById("addGoal").addEventListener("click", () => {
  const name = document.getElementById("goalName").value.trim() || "My Goal";
  const target = +document.getElementById("goalTarget").value || 0;
  const months = Math.max(+document.getElementById("goalMonths").value || 1, 1);
  const perMonth = Math.ceil(target / months);
  goals.push({ name, target, months, perMonth });
  document.getElementById("goalMsg").textContent = `Save ${fmt(perMonth)} per month for ${months} months.`;
  renderGoals();
});
function renderGoals() {
  document.getElementById("goalList").innerHTML = goals.map(g =>
    `<li>${g.name} — target ${fmt(g.target)} (${g.months} mo) · save ${fmt(g.perMonth)}/mo</li>`
  ).join("") || "<li>No goals yet.</li>";
}

// Nudges (based on common survey themes)
const nudges = [
  "Try a 24-hour rule for non-essential spends.",
  "Split group bills instantly to avoid carry-over debt.",
  "Label every spend; awareness cuts 10–15% over time.",
  "Keep 2–3 months of essentials as an SOS buffer."
];
document.getElementById("nudgeList").innerHTML = nudges.map(n => `<li>${n}</li>`).join("");

// Insights cards (static, from survey themes)
const insightData = [
  { title: "Peer pressure spending", pct: "High", note: "Common across Tier 1–3 and both urban/rural." },
  { title: "Budgeting & saving", pct: "High", note: "Frequent across respondents with ₹2,000–₹8,000 allowance." },
  { title: "Loans & rent sharing", pct: "Medium", note: "Recurring fixed-cost burden for many students." },
  { title: "Lack of financial knowledge", pct: "High", note: "Drives overspending and low savings rates." },
  { title: "Emergency funds", pct: "Medium", note: "Few maintain 2–3 months of cushion." }
];
document.getElementById("insightCards").innerHTML = insightData.map(i => `
  <div class="card">
    <h4>${i.title}</h4>
    <p><em>Prevalence:</em> ${i.pct}</p>
    <p>${i.note}</p>
  </div>
`).join("");
