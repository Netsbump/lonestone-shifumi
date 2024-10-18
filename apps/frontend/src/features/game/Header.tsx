import { Button } from '@/components/ui/button';
import { GearIcon, HomeIcon, SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export const Header = () => {

    const [isActiveSound, setIsActiveSound ] = useState(true);

    const handleClickSpeaker = () => {
        setIsActiveSound(prev => !prev);
    }

    return (
          <header className="flex items-center mt-2">
            <div className="flex-1">
              <Button asChild className="rounded-full bg-night-blue w-10 h-10 flex items-center justify-center hover:bg-hard-blue">
                <Link to="/">
                  <HomeIcon />
                </Link>
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-light-blue">Shifumi !</h2>
            </div>
            <div className="flex flex-1 justify-end gap-2">
              <Button className="rounded-full bg-night-blue w-10 h-10 flex items-center justify-center hover:bg-hard-blue" onClick={handleClickSpeaker}>
                {isActiveSound ? (
                    <SpeakerLoudIcon />
                ): (
                    <SpeakerOffIcon />
                )}   
              </Button>
              <Button className="rounded-full bg-night-blue w-10 h-10 flex items-center justify-center hover:bg-hard-blue">
                  <GearIcon />
              </Button>
            </div>
          </header>
    )
}