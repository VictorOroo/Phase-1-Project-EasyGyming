// This function  fetches data from the API
fetch('http://localhost:3000/members')
  .then(response => response.json())
  .then(data => {
    const members = data.members;

    // this creates the dropdown menu
    const membersDropdown = document.getElementById('members');
    membersDropdown.innerHTML = '<option value="">-- Select Member --</option>';
    data.forEach(member => {
      const option = document.createElement('option');
      option.value = member.memberId;
      option.textContent = member.name;
      membersDropdown.appendChild(option);
    });

    // this will show the selected members details
    membersDropdown.addEventListener('change', () => {
      const memberId = parseInt(membersDropdown.value);
      const member = data.find(member => member.memberId === memberId);
      if (member) {
        displayMemberDetails(member);
      } else {
        clearMemberDetails();
      }
    });

    // This searches for members in a specific level
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
      const levelInput = document.getElementById('level-search');
      const level = levelInput.value.toLowerCase();
      const filteredMembers = data.filter(member => member.level.toLowerCase() === level);
      const memberNames = filteredMembers.map(member => member.name);
      displayMemberSearchResults(memberNames);
    });

    // this will  display member details
    function displayMemberDetails(member) {
      const memberDetailsContainer = document.getElementById('member-details');
      memberDetailsContainer.innerHTML = `
        <h4>Member Details</h4>
        <p><strong>Name:</strong> ${member.name}</p>
        <p><strong>Gender:</strong> ${member.gender}</p>
        <p><strong>Level:</strong> ${member.level}</p>
        <h5>Membership</h5>
        <ul>
          ${member.membership.map(membership => `<li>${membership.plan} - Fee: ${membership.fee}</li>`).join('')}
        </ul>
        <h5>Exercise Details</h5>
        <table>
          <tr>
            <th>Day</th>
            <th>Exercises</th>
          </tr>
          ${Object.entries(member.exercises).map(([day, exercises]) => `
            <tr>
              <td>${day}</td>
              <td>${exercises.join(', ')}</td>
            </tr>
          `).join('')}
        </table>
        <img src="${member.image}" alt="${member.name}" />
      `;
    }

    // this will clear member details
    function clearMemberDetails() {
      const memberDetailsContainer = document.getElementById('member-details');
      memberDetailsContainer.innerHTML = '';
    }

    // this will display member results
    function displayMemberSearchResults(memberNames) {
      const memberDetailsContainer = document.getElementById('member-details');
      if (memberNames.length > 0) {
        memberDetailsContainer.innerHTML = `
          <h4>Search Results</h4>
          <p>${memberNames.join(', ')}</p>
        `;
      } else {
        memberDetailsContainer.innerHTML = `
          <h4>No Results Found</h4>
        `;
      }
    }
  });
