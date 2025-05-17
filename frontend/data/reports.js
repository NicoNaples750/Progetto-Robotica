export let reports = [
  { id: 1, missionId: 'M001', status: 'completata', description: 'Test report', createdAt: new Date().toISOString() }
];

function getReports() {
  return reports;
}

function addReport(report) {
  reports.push(report);
}

function deleteReport(id) {
  const index = reports.findIndex((r) => r.id === id);
  if (index !== -1) {
    reports.splice(index, 1);
    return true;
  }
  return false;
}

export { getReports, addReport, deleteReport };