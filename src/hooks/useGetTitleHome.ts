import {useEffect, useMemo, useState} from 'react';
import {useServices} from '~services/translate';
import {useHomeStore} from '~zustands/index';

export const useGetTitleHome = () => {
  const {t} = useServices();
  const {isPlant, isSuccess} = useHomeStore();
  const [title, setTitle] = useState(t.do('home.title.start_planting'));

  const titles = useMemo(
    () => [
      {id: '1', title: t.do('home.title.go_back_to_your_work')},
      {id: '2', title: t.do('home.title.dont_look_at_me')},
      {id: '3', title: t.do('home.title.hang_in_there')},
      {id: '4', title: t.do('home.title.you_can_do_it')},
    ],
    [t],
  );

  useEffect(() => {
    if (!isPlant) {
      if (isSuccess === null) {
        setTitle(t.do('home.title.start_planting'));
      } else if (isSuccess) {
        setTitle(t.do('home.title.you_have_planted_1_healthy_tree'));
      } else {
        setTitle(t.do('home.title.you_can_do_it_better_next_time'));
      }
      return;
    }
    let num = 1;
    setTitle(titles[0].title);
    const interval = setInterval(() => {
      if (isPlant) {
        if (num + 1 === titles.length) {
          setTitle(titles[num].title);
          num = 0;
          return;
        }
        setTitle(titles[num].title);
        num += 1;
      }
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [isPlant, titles, t, isSuccess]);
  return {
    title,
  };
};
