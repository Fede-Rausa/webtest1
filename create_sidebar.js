document.getElementById('sidebarToggle').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
    console.log("toggled");
  });


function createSidebar() {
    const sidebarContainer = document.getElementById('sidebar0');  // Get the sidebar container

    fetch("pages/sidebar.json")
        .then(response => response.json())
        .then(data => {
            const menu = data.sidebar;  // Get the sidebar menu items from the JSON

            // Loop through each menu item in the JSON and build the HTML
            menu.forEach((menuItem, index) => {
                const listItem = document.createElement('div');
                listItem.className = "nav-item"; // Create a new list item

                if (menuItem.submenu) {
                    if (menuItem.submenu.length > 0) {
                        // Create the collapsible head menu with the submenu container
                        const { fragment, submenuUl } = headMenu(menuItem, index);
                        listItem.appendChild(fragment); // Append the head menu

                        // Loop through each submenu item
                        menuItem.submenu.forEach(submenuItem => {
                            const submenuListItem = document.createElement('li');
                            submenuListItem.className = 'nav-item';

                            if (submenuItem.link) {
                                // Append link item to the submenu
                                const linkElement = linkItem(submenuItem);
                                submenuListItem.appendChild(linkElement);
                                submenuUl.appendChild(submenuListItem);  // Add to submenu <ul>
                            } else if (submenuItem.action) {
                                // Append action item to the submenu
                                const actionElement = actionItem(submenuItem);  // actionItem returns an element
                                submenuListItem.appendChild(actionElement);
                                submenuUl.appendChild(submenuListItem);  // Add to submenu <ul>
                            }
                        });

                    }
                } else {
                    // No submenu, create a single menu item
                    if (menuItem.link) {
                        const linkElement = linkItem(menuItem);
                        listItem.appendChild(linkElement);  // Append the link item directly
                    }
                    if (menuItem.action) {
                        const actionElement = actionItem(menuItem);  // actionItem returns an element
                        listItem.appendChild(actionElement);  // Append the action item directly
                    }
                }

                // Append the generated list item to the sidebar container
                sidebarContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            document.getElementById('target').innerHTML = '<p>Error loading the content.</p>';
            console.error('Error fetching Markdown file:', error);
        });
}
                    

function headMenu(item, index) {
    const anchor = document.createElement('a');
    anchor.className = "nav-link";
    anchor.setAttribute("data-bs-toggle", "collapse");
    anchor.setAttribute("href", `#submenu${index}`);
    anchor.setAttribute("role", "button");
    anchor.setAttribute("aria-expanded", "false");
    anchor.setAttribute("aria-controls", `submenu${index}`);
    anchor.textContent = item.title;

    const collapseDiv = document.createElement('div');
    collapseDiv.className = "collapse";
    collapseDiv.id = `submenu${index}`;

    const submenuUl = document.createElement('ul');
    submenuUl.className = "submenu nav flex-column ms-3";

    collapseDiv.appendChild(submenuUl);

    // Create a fragment to hold the anchor and collapsible div
    const fragment = document.createDocumentFragment();
    fragment.appendChild(anchor);
    fragment.appendChild(collapseDiv);

    return { fragment, submenuUl };  // Return the fragment and submenu <ul> for later appending
}

function linkItem(item) {
    const anchor = document.createElement('a');
    anchor.href = item.link;
    anchor.className = "nav-link";
    anchor.textContent = item.title;

    return anchor;  // Return the anchor DOM element
}


function actionItem(item){
    const anchor = document.createElement('a');
    anchor.textContent = item.title;
    anchor.className = "nav-link";
    anchor.onclick = function() {
        loadMarkdown(item.action);
    }
    anchor.style.cursor = 'pointer';
    return anchor;
}


