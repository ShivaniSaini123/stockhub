import React from "react";
import './Team.css';
// import dishaImage from 'media/images/disha.jpeg';
// import sharvariImage from 'media/images/sharvari.jpeg';
// import palakImage from 'media/images/palak.jpeg';
// import shivaniImage from 'media/images/shivani.jpeg';
function TeamMember({ name, branch, imageSrc, links }) {
  return (
    <div className="team-member">
      <img src={imageSrc} alt={name} />
      <h4>{name}</h4>
      <h6>{branch}</h6>
      <p>
        {links.map((link, index) => (
          <span key={index}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
            {index < links.length - 1 && " / "}
          </span>
        ))}
      </p>
    </div>
  );
}

function Team() {
  const teamMembers = [
    {
      name: "Disha Jain",
      branch: "Electrical",
    //   imageSrc: dishaImage,
     imageSrc: "media/images/disha.jpeg",
      links: [
        { label: "gitbub", href: "https://github.com/dishajain260" },
        { label: "linkedin", href: "https://www.linkedin.com/in/dishajain1804/" },
      ],
    },
    {
      name: "Sharvari",
      branch: "Electrical",
    //   imageSrc: sharvariImage,
    imageSrc: "media/images/sharvari.jpeg",
      links: [
        { label: "gitbub", href: "https://github.com/Sharvari2023" },
        { label: "linkedin", href: "https://www.linkedin.com/in/sharvari-patil-a39a19266/" },
      ],
    },
    {
      name: "Palak Jain",
      branch: "Mechanical",
    //   imageSrc: palakImage,
    imageSrc: "media/images/palak.jpeg", 
      links: [
        { label: "gitbub", href: "https://github.com/Pjdash" },
        { label: "linkedin", href: "https://www.linkedin.com/in/palak-jain-3bbb4b288/" },
      ],
    },
    {
      name: "Shivani Saini",
      branch: "Electrical",
    //   imageSrc: shivaniImage,
    imageSrc: "media/images/shivani.jpeg",
      links: [
        { label: "gitbub", href: "https://github.com/ShivaniSaini123" },
        { label: "linkedin", href: "https://www.linkedin.com/in/shivani-saini-79193728b/" },
      ],
    },
  ];

  return (
    <div className="team-section">
      <div className="team-header">
        <h1>Our Team</h1>
      </div>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            branch={member.branch}
            imageSrc={member.imageSrc}
            links={member.links}
          />
        ))}
      </div>
    </div>
  );
}

export default Team;
