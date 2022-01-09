# UILUGPORTAL ENHANCED

The University of Ilorin student portal, made for students, by students.
I basically got fed up of the UI, UX, and features, (or lack thereof) of the actual university portal and decided to build mine instead. Seriously, the actual portal is **the** worst piece of software i've ever used

Other things to include:

-   This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It works along-side the [backend](https://github.com/musab-olurode/uilugportal-backend) written in [Node.js](https://nodejs.org/en/).
-   Its currently at its first release (1.0 if you will), with most of the existing 'READ' features of the university's version and a couple of other features. changelog [here](CHANGELOG.md).
-   Working version [here](https://uilugportal.vercel.app/auth/signin)
-   I **do not** think there are any projects like this, for UNILORIN at least. But even if there are, i believe this is one of a kind.

## Screenshots

![](https://user-images.githubusercontent.com/49688259/148561184-17d8337a-d251-4df4-8c6a-2ca34e7267eb.png)
![](https://user-images.githubusercontent.com/49688259/148434304-f8b4b8e1-d3fe-442e-abc8-708679c343ab.png)
![](https://user-images.githubusercontent.com/49688259/148434364-f50a8ee4-a883-4d29-aa27-592cc9bb2512.png)
![](https://user-images.githubusercontent.com/49688259/148434423-9407e223-e9f0-4497-8a27-a646127a1ddc.png)
![](https://user-images.githubusercontent.com/49688259/148434511-e8ed8ae5-b91d-41bb-ac6a-2428f7931fb3.png)

## Dependencies

-   [Node.js 14.17.5 or later](https://nodejs.org/en/)
-   [NextJs](https://nextjs.org/)
-   [Typescript 4.5.2 or later](https://www.typescriptlang.org/)

## Installation/Getting Started

First, clone the project:

```bash
git clone https://github.com/musab-olurode/uilugportal-frontend.git
```

CD into the project direcetory:

```bash
cd uilugportal-frontend
```

Install dependencies:

```bash
npm install
# or
yarn
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

You can work on the frontend only with the default configuration (connected to the deployed [nodejs backed](https://uilugportal-backend.herokuapp.com/v1)). if you do intend to work with a local version of the backend, you should update the `configBaseServerUrl` like so:

```typescript
    const config = {
-       configBaseServerUrl: 'https://uilugportal-backend.herokuapp.com/v1',
+	configBaseServerUrl: 'http://localhost:5000/v1',
    };

    export default config;
```

## Upcoming Featues

-   Assignments scheduling
-   Course materials sharing
-   Task planning/scheduling

<!-- ## Tests

**COMING SOON** -->

## Known issues

**None**

## Getting help

If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.

## Getting involved

Since this is a project for students by students, the main objective is to add features that students need and improve the overall experience of accessing the student portal.

General instructions on _how_ to contribute can be found [here](CONTRIBUTING.md).

---

## Open source licensing info

Copyright 2021 Olurode Mus'ab

-   [LICENSE](LICENSE)

---

<!-- ## Credits and references

1. Projects that inspired you
2. Related projects
3. Books, papers, talks, or other sources that have meaningful impact or influence on this project -->

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with the University of Ilorin or any of its subsidiaries or its affiliates. The official university portal can be found [here](https://uilugportal.unilorin.edu.ng/index.php). This is an independent and unofficial software.
