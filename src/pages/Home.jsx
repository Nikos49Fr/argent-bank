import FeaturesCard from '../components/FeaturesCard';
import Hero from '../components/Hero';
import { FEATURES } from '../data/features';

export default function Home() {
    return (
        <>
            <Hero />
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {FEATURES.map((item) => (
                    <FeaturesCard
                        img={item.icon}
                        title={item.title}
                        content={item.content}
                        key={item.id}
                    />
                ))}
            </section>
        </>
    );
}
