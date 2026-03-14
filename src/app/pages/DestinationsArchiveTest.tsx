/**
 * TEST FILE: Destinations Archive Import Test
 * 
 * This file tests if all imports work correctly for the destinations archive.
 * If this loads successfully, we know the data imports are working.
 */

import { Container } from "../components/common/Container";
import { DESTINATIONS, CONTINENTS } from "../data/mock";

function DestinationsArchiveTest() {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-[length:var(--text-4xl)] font-[var(--font-weight-bold)] pb-6">Destinations Import Test</h1>
        
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-[length:var(--text-2xl)] font-[var(--font-weight-bold)] pb-2">Continents</h2>
            <p className="text-muted-foreground">Found {CONTINENTS.length} continents</p>
            <ul className="list-disc pl-6 pt-2">
              {CONTINENTS.map((continent) => (
                <li key={continent.id}>{continent.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold pb-2">Destinations</h2>
            <p className="text-muted-foreground">Found {DESTINATIONS.length} destinations</p>
            <ul className="list-disc pl-6 pt-2">
              {DESTINATIONS.slice(0, 10).map((dest) => (
                <li key={dest.id}>
                  {dest.title} ({dest.type}) - {dest.continentId}
                </li>
              ))}
            </ul>
            {DESTINATIONS.length > 10 && (
              <p className="text-sm text-muted-foreground pt-2">
                ... and {DESTINATIONS.length - 10} more
              </p>
            )}
          </div>

          <div className="p-4 bg-success/10 border border-success rounded">
            <p className="font-bold text-success">✓ All imports working correctly!</p>
            <p className="text-sm text-muted-foreground pt-1">
              If you can see this message, the data structure is valid.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DestinationsArchiveTest;