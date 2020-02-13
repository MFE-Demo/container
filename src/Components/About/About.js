import React from "react";
import './About.css'

function About() {
  return (
    <main id="about">
      <h2>About this app</h2>
      <p>
        This website was created to to demonstrate one way to use a micro
        front-end architecture.
      </p>
      <p>
        Micro frontends is an architectural style where independently
        deliverable frontend applications are composed into a greater whole.
        It's useful for breaking up monolithic frontend codebases into smaller,
        simpler applications that can be delivered to production by multiple
        teams independently.
      </p>
      <p>
          Github repo links etc..
      </p>
    </main>
  );
}

export default About;
