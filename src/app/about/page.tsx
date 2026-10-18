import type { Metadata } from "next";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TokenPurchaseCTA } from "@/components/ui/TokenPurchaseCTA";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us | Manumit Me Foundation",
  description:
    "Learn about the Manumit Me Foundation's mission to advance education, advocacy, humanitarian support, and community empowerment through compassion and blockchain innovation.",
};

const coreValues = [
  {
    letter: "M",
    title: "Membership",
    body: "We believe in supporting efforts that promote freedom, dignity, empowerment, and the removal of unjust barriers.",
    color: "from-gold/20 to-gold/5 border-gold/20",
    textColor: "text-gold",
  },
  {
    letter: "A",
    title: "Activity",
    body: "We believe in accepting responsibility for one's actions, decisions, and commitments.",
    color: "from-forest/20 to-forest/5 border-forest/20",
    textColor: "text-forest-dark",
  },
  {
    letter: "C",
    title: "Calculation",
    body: "We believe that people must earn trust through honesty, consistency, and ethical conduct.",
    color: "from-gold/20 to-gold/5 border-gold/20",
    textColor: "text-gold",
  },
  {
    letter: "T",
    title: "Tracking",
    body: "We reject deliberate deception, and endeavor to engage in good-faith dialogue, and are forever in the pursuit of truth.",
    color: "from-forest/20 to-forest/5 border-forest/20",
    textColor: "text-forest-dark",
  },
  {
    letter: "S",
    title: "System",
    body: "We acknowledge that meaningful change often requires personal effort, time, resources, and service.",
    color: "from-gold/20 to-gold/5 border-gold/20",
    textColor: "text-gold",
  },
];

const initiatives = [
  { icon: "📚", text: "Education and public awareness" },
  { icon: "🗣️", text: "Advocacy and civic engagement" },
  { icon: "🤝", text: "Humanitarian assistance" },
  { icon: "🏘️", text: "Community support programs" },
  { icon: "🔬", text: "Research and outreach" },
  { icon: "⛓️", text: "Technology-driven solutions for social impact" },
];

const humanQualities = [
  { icon: "💚", label: "Compassion" },
  { icon: "🤲", label: "Empathy" },
  { icon: "🛠️", label: "Service" },
  { icon: "📖", label: "Education" },
  { icon: "🗳️", label: "Advocacy" },
  { icon: "🏘️", label: "Community Engagement" },
  { icon: "🤝", label: "Human Connection" },
];

const whyMatters = [
  {
    title: "Expanding Participation",
    body: "Many people want to support causes they care about but lack the financial flexibility to dedicate significant time and resources. By creating a community and system that rewards meaningful participation, members can become active contributors rather than passive observers.",
  },
  {
    title: "Reducing Dependency on Gatekeepers",
    body: "Traditional advocacy often depends on centralized organizations and institutions. A decentralized ecosystem allows network members to participate directly and retain greater ownership over their efforts and impact.",
  },
  {
    title: "Creating Value Around Human Qualities",
    body: "As artificial intelligence and automation continue to reshape industries, uniquely human qualities become increasingly important. Empathy, compassion, mentorship, advocacy, and community-building are qualities that cannot be fully replicated by machines. Manumit Core seeks to recognize and reward these contributions.",
  },
  {
    title: "Aligning Incentives with Positive Action",
    body: "When positive actions create measurable value, communities become stronger, participation increases, and social impact becomes more sustainable.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen pt-24">

      {/* ── HERO ── */}
      <section className="relative py-20 lg:py-28 border-b border-ink/8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-forest/6 to-ivory" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(27,122,50,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(27,122,50,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container-wide relative text-center">
          <SectionReveal>
            {/* Foundation Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative w-72 sm:w-96 h-40 sm:h-52">
                <Image
                  src="/logos/manumit-me-foundation-logo.png"
                  alt="Manumit Me Foundation — Empower, Educate, Elevate, Empower Humanity"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              Who We Are
            </p>
            <div className="section-divider" />
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink mb-6 leading-tight">
              About{" "}
              <span className="text-forest-gradient">Manumit Me</span>
              <br />
              Foundation
            </h1>
            <p className="text-ink/70 max-w-2xl mx-auto text-lg leading-relaxed">
              Created to advance education, advocacy, humanitarian support, and community
              empowerment. We believe every person deserves dignity, opportunity, and a voice in
              shaping a more just and compassionate society.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── OUR MISSION ── */}
      <section className="py-20 lg:py-28">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SectionReveal>
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                Our Mission
              </p>
              <div className="section-divider mx-0" />
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-6 leading-tight">
                Two Missions.
                <br />
                <span className="text-forest-gradient">One Purpose.</span>
              </h2>
              <div className="space-y-5 text-ink/70 text-base leading-relaxed">
                <p>
                  Our mission is to support individuals, families, and communities affected by
                  injustice, oppression, inequality, and systemic barriers through education,
                  awareness, collaboration, and meaningful action.
                </p>
                <p>
                  At its core, Manumit Me Foundation serves two distinct yet interconnected
                  missions. The first is a{" "}
                  <span className="text-ink font-medium">traditional humanitarian mission</span>{" "}
                  focused on advocacy, education, outreach, and support for those impacted by
                  injustice and inequality.
                </p>
                <p>
                  The second is a{" "}
                  <span className="text-ink font-medium">forward-looking mission</span> centered
                  on the development and stewardship of innovative blockchain solutions designed to
                  develop a community and empower its members through decentralized participation.
                </p>
                <p className="text-gold italic font-medium">
                  Together, these missions reflect our belief that lasting change requires both
                  compassion and innovation.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="space-y-4">
                {[
                  {
                    icon: "🕊️",
                    title: "Humanitarian Mission",
                    desc: "Advocacy, education, outreach, and direct support for communities impacted by systemic injustice.",
                  },
                  {
                    icon: "⛓️",
                    title: "Blockchain Mission",
                    desc: "Stewarding innovative decentralized solutions that empower individuals through transparent participation and reward.",
                  },
                  {
                    icon: "✨",
                    title: "United Purpose",
                    desc: "Two missions, one foundation. Compassion and innovation working together to create lasting, measurable change.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-5 p-5 rounded-2xl border border-ink/10 bg-white hover:border-forest/25 hover:shadow-card-hover transition-all"
                  >
                    <span className="text-3xl shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="font-display text-base font-bold text-ink mb-1">
                        {item.title}
                      </h3>
                      <p className="text-ink/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── WHY WE EXIST ── */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container-wide">
          <SectionReveal className="text-center mb-14">
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              Why We Exist
            </p>
            <div className="section-divider" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-6 max-w-2xl mx-auto">
              Bridging the Gap Between
              <span className="text-forest-gradient"> Compassion and Action</span>
            </h2>
            <p className="text-ink/65 max-w-2xl mx-auto leading-relaxed">
              Across the world, countless individuals face barriers created by injustice,
              inequality, and limited access to education. Many people genuinely want to help, yet
              often lack the tools, opportunities, or financial means to become actively engaged.
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "🌍",
                title: "The Problem",
                body: "Systemic barriers prevent billions of people from accessing justice, education, and economic opportunity. Passion exists, but resources rarely reach where they are needed most.",
              },
              {
                icon: "🌉",
                title: "The Bridge",
                body: "Manumit Me Foundation was created to help bridge that gap, empowering people through knowledge, collaboration, advocacy, technology, and innovative solutions.",
              },
              {
                icon: "🌟",
                title: "The Vision",
                body: "Positive change should not be limited to those with wealth or influence. Every individual should have the opportunity to contribute to causes they care about and be recognized for their efforts.",
              },
            ].map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-ink/10 bg-white p-8 hover:border-forest/25 hover:shadow-card-hover transition-all">
                  <span className="text-4xl block mb-4">{item.icon}</span>
                  <h3 className="font-display text-lg font-bold text-ink mb-3">{item.title}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed">{item.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES / M.A.C.T.S ── */}
      <section className="py-20 lg:py-28">
        <div className="container-wide">
          <SectionReveal className="text-center mb-14">
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              Core Values
            </p>
            <div className="section-divider" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-4">
              The <span className="text-forest-gradient">M.A.C.T.S</span> Framework
            </h2>
            <p className="text-ink/65 max-w-xl mx-auto text-sm leading-relaxed">
              Together, these principles form the foundation of everything we do.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {coreValues.map((val, i) => (
              <SectionReveal key={val.letter} delay={i * 0.1}>
                <div
                  className={`h-full rounded-2xl border bg-gradient-to-b ${val.color} p-6 text-center`}
                >
                  <div className={`font-display text-5xl font-black ${val.textColor} mb-3`}>
                    {val.letter}
                  </div>
                  <h3 className="font-display text-sm font-bold text-ink mb-2">{val.title}</h3>
                  <p className="text-ink/55 text-xs leading-relaxed">{val.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3} className="mt-8 text-center">
            <div className="inline-block px-6 py-3 rounded-full border border-gold/20 bg-gold/5">
              <span className="text-gold font-display font-bold tracking-widest text-xl">
                M.A.C.T.S.
              </span>
              <span className="text-ink/40 mx-3">·</span>
              <span className="text-ink/65 text-sm italic">Manumission Is the Mission</span>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SectionReveal>
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                What We Do
              </p>
              <div className="section-divider mx-0" />
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-6 leading-tight">
                Supporting Initiatives
                <br />
                <span className="text-forest-gradient">That Matter</span>
              </h2>
              <p className="text-ink/65 leading-relaxed mb-8">
                Manumit Me Foundation supports a broad range of initiatives focused on creating
                lasting, sustainable change. We believe lasting change occurs when people are
                equipped with the knowledge, resources, and support necessary to take meaningful
                action.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {initiatives.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 p-3 rounded-xl border border-ink/10 bg-white"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-ink/75 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="rounded-2xl border border-forest/20 bg-gradient-to-br from-forest/5 to-gold/5 p-8">
                <p className="text-gold font-display text-xl font-bold italic text-center mb-6">
                  &ldquo;Compassion in Action. Empowerment Through Education. Innovation Through
                  Blockchain. Freedom Through Community.&rdquo;
                </p>
                <div className="text-center">
                  <div className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
                    <span className="text-gold font-semibold text-sm tracking-widest uppercase">
                      Manumission Is the Mission
                    </span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── LOOKING TOWARD THE FUTURE / ORIGIN STORY ── */}
      <section className="py-20 lg:py-28">
        <div className="container-wide max-w-4xl">
          <SectionReveal className="text-center mb-14">
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              Our Story
            </p>
            <div className="section-divider" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-6">
              Looking Toward
              <span className="text-forest-gradient"> the Future</span>
            </h2>
          </SectionReveal>

          <div className="space-y-8 text-ink/70 text-base leading-relaxed">
            <SectionReveal>
              <p>
                While our traditional mission remains central to who we are, the Foundation has
                also been entrusted with stewarding a new and innovative blockchain solution
                designed to address one of society&apos;s most persistent challenges: how to
                empower ordinary people to actively combat injustice and oppression.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="border-l-2 border-gold/40 pl-6 py-2">
                <p className="text-ink/75">
                  The origins of Manumit Me trace back to{" "}
                  <strong className="text-ink">2020</strong>, when one of our founders launched
                  the organization to raise awareness surrounding the incarceration of her father,
                  who is serving a life sentence for a non-violent drug offense.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <p>
                As research expanded and conversations with impacted families grew, it became clear
                that this issue extended far beyond a single case. Countless individuals and
                families were struggling with systems they believed were unjust, yet lacked the
                resources necessary to effectively advocate for change.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.18}>
              <p>
                At the same time, many advocacy movements became dependent upon centralized
                organizations, gatekeepers, and performative actors who frequently benefited more
                than the communities they claimed to represent. The question became:
              </p>
              <p className="text-gold italic font-medium mt-4">
                How can ordinary people be empowered to participate directly in fighting injustice
                while receiving value for their efforts?
              </p>
              <p className="mt-4">
                This question eventually led to the blockchain solution presented by Manumit Core.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="rounded-2xl border border-gold/15 bg-gold/5 p-8 text-center">
                <p className="text-ink/60 text-sm mb-4">
                  What emerged from these experiences was a simple but powerful realization:
                </p>
                <p className="font-display text-xl text-ink font-semibold mb-2">
                  The problem was not a lack of compassion.
                </p>
                <p className="font-display text-xl text-gold font-semibold">
                  The problem was a lack of sustainable resources.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── INTRODUCING MANUMIT CORE ── */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container-wide">
          <SectionReveal className="text-center mb-14">
            <p className="text-forest-dark text-xs font-semibold tracking-widest uppercase mb-3">
              Innovation
            </p>
            <div className="section-divider" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-6">
              Introducing{" "}
              <span className="text-forest-gradient">Manumit Core</span>
            </h2>
            <p className="text-ink/65 max-w-2xl mx-auto leading-relaxed">
              Built around a simple principle:{" "}
              <strong className="text-ink">Time + Energy = Value.</strong> Human beings create
              value every day through compassion, advocacy, education, service, mentorship,
              community engagement, and acts of support for others. Yet these contributions often
              go uncompensated. Manumit Core seeks to change that.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1} className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-ink/70 leading-relaxed">
              The project introduces a novel mining and participation model designed to reward
              members who engage in activities that advance justice, education, community support,
              and humanitarian causes. Rather than focusing exclusively on computational power,
              the Manumit Core vision recognizes that some of humanity&apos;s most valuable
              contributions are inherently human.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {humanQualities.map((item, i) => (
              <SectionReveal key={item.label} delay={i * 0.07}>
                <div className="flex items-center gap-3 rounded-xl border border-forest/20 bg-forest/5 px-4 py-4 hover:border-forest/35 transition-all">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-ink/75 font-medium text-sm">{item.label}</span>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.2} className="text-center mb-12">
            <div className="inline-block rounded-2xl border border-gold/15 bg-gold/5 px-8 py-5 max-w-2xl">
              <p className="text-ink/75 text-sm leading-relaxed">
                Under this model, individuals who contribute to approved mission-driven activities
                may increase their participation and earning potential, among other things, within
                the ecosystem. In simple terms, Manumit Core seeks to{" "}
                <span className="text-gold font-semibold">
                  transform positive social action into measurable economic value.
                </span>
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.25}>
            <h3 className="font-display text-2xl font-bold text-ink text-center mb-8">
              Why This <span className="text-forest-gradient">Matters</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {whyMatters.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-ink/10 bg-white p-6 hover:border-forest/25 hover:shadow-card-hover transition-all"
                >
                  <h4 className="font-display text-base font-bold text-gold mb-2">{item.title}</h4>
                  <p className="text-ink/60 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── A NEW WAY FORWARD ── */}
      <section className="py-20 lg:py-28">
        <div className="container-wide max-w-3xl text-center">
          <SectionReveal>
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              A New Way Forward
            </p>
            <div className="section-divider" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-8 leading-tight">
              Technology That Serves
              <span className="text-forest-gradient"> Humanity</span>
            </h2>
            <div className="space-y-4 text-ink/70 leading-relaxed mb-8 text-left">
              <p>The goal of Manumit Core is not simply to create another cryptocurrency.</p>
              <p>The goal is to create a community and ecosystem where technology serves humanity rather than the other way around:</p>
              <ul className="space-y-2 ml-4">
                {[
                  "where members are rewarded for helping others;",
                  "where everyone can organize, advocate, educate, and support one another through decentralized participation;",
                  "where human dignity and human value remain at the center of innovation.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-gold mt-1 shrink-0">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gold/15 bg-gold/5 p-6 text-left mb-4">
              <p className="text-ink/75 leading-relaxed mb-3">
                When you hold Manumit Core, you are part of a community and are participating in a
                vision that seeks to align technology, community, and social impact. You are
                supporting a community built on the belief that compassion, empathy, education,
                and advocacy are among humanity&apos;s most valuable assets.
              </p>
              <p className="text-gold font-display text-xl font-bold italic text-center">
                When you hold Manumit Core, you are holding Love.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── JOIN THE MOVEMENT ── */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container-wide max-w-3xl text-center">
          <SectionReveal>
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              Join Us
            </p>
            <div className="section-divider" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-6">
              Join the Movement —{" "}
              <span className="text-forest-gradient">Become a Member</span>
            </h2>
            <p className="text-ink/70 text-lg leading-relaxed mb-4">
              Whether you are an advocate, educator, volunteer, researcher, creator, donor,
              developer, or simply someone who believes positive change is possible, there is a
              place for you within the Manumit Me community.
            </p>
            <p className="text-ink/80 font-medium mb-8">
              Together, we can educate, empower, and inspire meaningful action.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <TokenPurchaseCTA label="Join the Waitlist" action="waitlist" size="lg" />
              <Button variant="secondary" size="lg" href="/whitepaper" isExternal={false}>
                Read the Whitepaper
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                "Compassion in Action",
                "Empowerment Through Education",
                "Innovation Through Blockchain",
                "Freedom Through Community",
              ].map((tagline) => (
                <div key={tagline} className="rounded-xl border border-gold/10 bg-gold/3 p-3">
                  <p className="text-gold text-xs font-semibold text-center leading-snug">
                    {tagline}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── FOOTER TAGLINE ── */}
      <section className="py-12 border-t border-ink/8 text-center">
        <SectionReveal>
          <p className="font-display text-gold text-2xl sm:text-3xl font-bold italic">
            MANUMISSION IS THE MISSION.
          </p>
        </SectionReveal>
      </section>
    </div>
  );
}
