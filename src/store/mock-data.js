export const mockTasks = {
  categories: [
    {
      categoryName: 'Kanban tasks',
      categorySlug: 'kanban-tasks',
      statuses: ['todo', 'done'],
      todos: [
        {
          status: 'todo',
          id: 1,
          title: 'Проверить instagram',
          description: 'Листать ленту 30мин. Смотреть reels 30мин.',
          subTasks: [
            {
              id: 'csKiwSwnCwHKM7iGlHHcB',
              title: 'reels',
              completed: false
            },
            {
              id: 'Vy1Icj3JDMFoioRGAH1tZ',
              title: 'видео из переписок',
              completed: true
            }
          ]
        },
        {
          status: 'todo',
          id: 2,
          title: 'Проверить тикток',
          description: '1ч смотреть тиктоки. Отправить минимум 20 видео друзьям.',
          subTasks: []
        },
        {
          status: 'done',
          id: 3,
          title: 'Покушать',
          description:
            'Пельмени. Хорошие пельмени это очень вкусно. На самом деле рецепт простой - много мяса, мало теста. Сперва готовим тонкое яичное тесто, с добавлением сливочного масла. Лук сладких сортов для образования бульончика и перец совсем немного... ',
          subTasks: [
            {
              id: 'h4F8mTKygSSGmiLGczVGq',
              title: 'много мяса',
              completed: true
            },
            {
              id: 'G7VG3D4kzpBWfuMlgkRTF',
              title: 'мало теста',
              completed: true
            }
          ]
        },
        {
          status: 'done',
          id: 4,
          title: 'Смотреть ютуб',
          description: 'Впитать ежедневную порцию контента',
          subTasks: [
            {
              id: 'uSgjJax3Dpwbani0UFjzS',
              title: 'https://www.youtube.com/watch?v=g6zwP0VyFAk',
              completed: false
            },
            {
              id: 'lFsExpZlXoZMbcfXJWx3o',
              title: 'https://www.youtube.com/watch?v=DGBYO_KK2lQ',
              completed: false
            },
            {
              id: 'GNmGdOjR2rDupU_-NcUWv',
              title: 'https://www.youtube.com/watch?v=Bi4MO2P3DlI',
              completed: false
            }
          ]
        }
      ]
    },
    {
      categoryName: 'Global tasks',
      categorySlug: 'global-tasks',
      statuses: ['todo', 'doing'],
      todos: [
        {
          status: 'todo',
          id: 5,
          title: 'ЬЬДь',
          description:
            'Мой дед однажды сказал мне: "Никого не слушай и никому не доверяй"... Потом он еще что-то говорил, но я его уже не слушал.',
          subTasks: []
        }
      ]
    }
  ]
}
