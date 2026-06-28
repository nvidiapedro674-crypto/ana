import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import Bio from "@/components/Bio";
import Discography from "@/components/Discography";
import Songs from "@/components/Songs";
import Legacy from "@/components/Legacy";
import Gallery from "@/components/Gallery";
import Credits from "@/components/Credits";
import Footer from "@/components/Footer";
import VisitorTracker from "@/components/VisitorTracker";

export default function Home() {
  return (
    <>
      <VisitorTracker />
      <Nav />
      <main>
        <Hero />
        <Quote />
        <Bio />
        <Discography />
        <Songs />
        <Legacy />
        <Gallery />
        <Credits />
      </main>
      <Footer />
    </>
  );
}
