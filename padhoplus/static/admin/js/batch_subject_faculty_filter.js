(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const subjectSelects = document.querySelectorAll('select[name*="subject"]');
    const facultySelects = document.querySelectorAll('select[name*="faculty"]');
    
    subjectSelects.forEach((subjectSelect, index) => {
      const facultySelect = facultySelects[index];
      
      subjectSelect.addEventListener('change', function() {
        const subjectId = this.value;
        if (!subjectId) {
          facultySelect.innerHTML = '<option value="">---------</option>';
          return;
        }
        
        fetch(`/api/subjects/${subjectId}/faculty/`)
          .then(response => response.json())
          .then(data => {
            facultySelect.innerHTML = '<option value="">---------</option>';
            data.forEach(faculty => {
              const option = document.createElement('option');
              option.value = faculty.id;
              option.textContent = faculty.name;
              facultySelect.appendChild(option);
            });
          })
          .catch(error => console.error('Error:', error));
      });
    });
  });
})();
