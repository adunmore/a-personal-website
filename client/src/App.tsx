import './App.css'
import StyleForm from './StyleForm'

export default function App() {
    return (
        <div className="wrapper">
            <main>
                <section>
                    <h1>A first post</h1>
                    <h4>November 1, 2023</h4>
                    <p>

                        Hi. Here's the first post on my personal site. I've been programming for a few years but I never built a website from end to end.

                        My goal is for this site to be a sandbox to change that. A few features I have in mind, which I've picked to guide me to learn some specific technologies:
                    </p>
                    <ol>
                        <li>
                            Implement CI/CD. Specifically, automatically deploy the site when I merge changes to Github. I've worked with Docker and Github Actions and stuff before but I want to refresh this.
                        </li>
                        <li>
                            Use React and Express to build some interactive parts. Basically I want to learn the basics of CRUD with React/Node.
                        </li>
                        <li>
                            Implement some kind of CMS that I can use to make and track posts. It seems fun to build and it's a reason to add a database to the app. Again, I've set up databases before but this will likely be a nice chance to refresh that.
                        </li>
                        <li>
                            Some kind of generative AI feature! I've got a pretty concrete idea for this: let users prompt GPT to generate a stylesheet for the site. There are some interesting challenges here, like how do I tell the AI what the site looks like, without just sending all the html and paying for a million tokens each time?

                            Like lots of people I've used chatgpt a bunch for personal stuff but I'm curious to build an actual app with it! And I'll learn the OpenAI API along the way.
                        </li>
                    </ol>
                    <p>
                        As of today, I've implemented items 1 and 4! Although my implementation of 4 is pretty basic, it pretty much works. Try it out in the sidebar on the right!
                    </p>
                    <p>
                        Also: Check out the repo where I'm building this: <a href='http://github.com/adunmore/a-personal-website'>github.com/adunmore/a-personal-website</a>
                    </p>
                </section>
            </main>
            <div className="sidebar">
                <section className="style-controls">
                    <StyleForm />
                </section>
            </div>
        </div >
    )
}