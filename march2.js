// 2021 (c) Панкратов Андрей Валерьевич, Екатеринбургский Кадетский Корпус
// Использование материалов допускается только с письменного разрешения автора

export default function programma(kadets) {

	var march = kadets.create_march();
	kadets.append_stage(march, kadets.create_stage_rectangle(9, 9));

	kadets.append_long_text(march, `
======================= Начало

Г1 = 1,2,3,4, 10,11,12,13,  19,20,21,22,  28,29,30,31
Г2 = 6,7,8,9, 15,16,17,18, 24,25,26,27, 33,34,35,36
Г3 = 46,47,48,49, 55,56,57,58, 64,65,66,67, 73,74,75,76
Г4 = 51,52,53,54, 60,61,62,63,  69,70,71,72,  78,79,80,81

КРЕСТ = 5,14,23,32, 37,38,39,40,41,42,43,44,45, 50,59,68,77
ВСЕ = Г1,Г2,Г3,Г4,КРЕСТ

КРЕСТ цвет 1,0,0 красный
Г1 цвет 1,1,1 белый
Г2 цвет 0,0,1 синий
Г3 цвет 0,1,0 зеленый
Г4 цвет 1,1,0 желтый

# пауза 18.3

======================= Этап 1

Г1 с шага 2 движение 4 шага
Г1 с шага 7 поворот налево
Г1 с шага 9 движение 2.5 шага

Г2 с шага 1 поворот налево
Г2 с шага 2 движение 4 шагов
Г2 с шага 8 поворот налево
Г2 с шага 9 движение 2.5 шага
                             
Г3 с шага 1 поворот направо
Г3 с шага 2 движение 4 шага
Г3 с шага 8 поворот налево
Г3 с шага 9 движение 2.5 шага

Г4 с шага 1 поворот кругом
Г4 с шага 2 движение 4 шага
Г4 с шага 8 поворот налево
Г4 с шага 9 движение 2.5 шага

ВСЕ с шага 12 поворот на зрителя

========================== Этап 2

Г1 с шага 1 поворот налево
Г1 с шага 2 движение 6.5 шагов время 6
Г2 с шага 1 поворот кругом
Г2 с шага 2 движение 6.5 шагов время 6

Г3 с шага 2 движение 6.5 шагов время 6

Г4 с шага 1 поворот направо
Г4 с шага 2 движение 6.5 шагов время 6

# Делаем Ромб
32 цвет 0,0,0
32 с шага 1 поворот налево
32 с шага 5 движение 3 шага

23 с шага 1 поворот налево
23 с шага 5 движение 2 шага

14 с шага 1 поворот налево
14 с шага 5 движение 1 шага                   

##################
42 с шага 1 поворот кругом
42 с шага 5 движение 3 шага

43 с шага 1 поворот кругом
43 с шага 5 движение 2 шага

44 с шага 1 поворот кругом
44 с шага 5 движение 1 шага

##################
50 с шага 1 поворот направо
50 с шага 5 движение 3 шага

59 с шага 1 поворот направо
59 с шага 5 движение 2 шага

68 с шага 1 поворот направо
68 с шага 5 движение 1 шага

##################
40 с шага 5 движение 3 шага
39 с шага 5 движение 2 шага
38 с шага 5 движение 1 шага

##################

ВСЕ с шага 9 поворот на зрителя


======================= Этап 3

Г1 с шага 1 поворот кругом
Г1 с шага 2 движение 5 шагов

Г2 с шага 2 движение 4 шагов

Г3 с шага 1 поворот кругом
Г3 с шага 2 движение 4 шагов

Г4 с шага 2 движение 5 шагов

5,40,39,38,37,50,59,68 с шага 1 поворот направо
77,42,43,44,45,32,23,14 с шага 1 поворот налево

5 с шага 2 движение 4 шага
40 с шага 2 движение 3 шага
39 с шага 2 движение 2 шага
38 с шага 2 движение 1 шаг

77 с шага 2 движение 4 шага
42 с шага 2 движение 3 шага
43 с шага 2 движение 2 шага
44 с шага 2 движение 1 шаг

14 с шага 2 движение 3 шага
23 с шага 2 движение 2 шага
32 с шага 2 движение 1 шаг

68 с шага 2 движение 3 шага
59 с шага 2 движение 2 шага
50 с шага 2 движение 1 шаг

ВСЕ с шага 7 поворот на зрителя

======================= Этап 4

41 с шага 1 движение 6 шагов
#5,40,39, 38, 37, 50, 59, 68 с шага 1 поворот кругом
#5,40,39, 38, 37, 50, 59, 68, 14,23,32,45,44,43,42,77 с шага 2 движение 1 шаг

Г3 с шага 3 поворот налево
Г4 с шага 3 поворот налево
5,40,39, 38, 37, 50, 59, 68 с шага 3 поворот налево

Г1 с шага 3 поворот направо
Г2 с шага 3 поворот направо

14,23,32,45,44,43,42,77 с шага 3 поворот направо

# РАСЧЕСКА
ВСЕ кроме 41 с шага 4 поворот 3

ВСЕ кроме 41 с шага 4 движение 11 шагов

======================= Этап 5
ВСЕ с шага 1 выровняться

ВСЕ кроме 41 с шага 1 поворот кругом
ВСЕ кроме 41 с шага 2 движение 2.5 шага

ВСЕ с шага 5 поворот на зрителя

# Г3,Г4, 5,40,39, 38, 37, 50, 59, 68 с шага 6 движение 1 шаг

=========== БУКВЫ ЕКК

Е = 77, 42, 43, 44, 45, 32, 23, 14, 33, 24, 25, 15, 6, 28, 19, 10, 1, 34, 35, 16, 7, 29, 20, 11, 2, 35, 26, 8
К1 = 17, 30, 21, 12, 3, 36, 27, 18, 9, 31, 22, 13, 4, 41, 78, 69, 65, 51, 73, 64, 55, 46, 79, 70, 61, 52, 74, 60
К2 = 80, 81, 68, 71, 72, 59, 62, 63, 50, 53, 54, 37, 75, 76, 38, 66, 67, 39, 57, 58, 40, 48, 49, 5, 65, 56, 47

ВСЕ цвет 0,0,0 черный
Е цвет 1,1,1 белый
К1 цвет 0,0,1 синий
К2 цвет 1,0,0 красный

=== ОП

Е - поворот направо

# К1
9, 78, 69 - поворот направо
18, 27, 36, 79, 70, 61, 52, 74 - поворот кругом
60 - поворот налево
41 - сдвиг 0.5

# К2
К2 - поворот налево

=== Команда 1 Шагом марш

Е - движение 5 шага вперед

# К1
9 - движение 1 шаг вперед
36, 27, 18 - движение 3 шага вперед
73, 64, 55, 46 - движение 2 шага вперед
52, 74, 61, 70, 79 - движение 3 шага вперед
41 - 0.5 шаг вперед

# К2
К2 - движение 4 шага вперед


=== ОП2

# Е
28 - поворот кругом
19,10, 1, 29, 20, 11, 2 - поворот налево
34, 33, 24, 15, 16, 25 - поворот направо

# К1
9, 18, 27, 36, 55, 46, 41 - поворот налево
22, 13, 4, 73, 79, 70, 61, 52, 74 - поворот направо


# К2
81, 72, 63, 68, 59, 50, 37, 38, 39 - поворот налево
65, 56, 47, 67, 58, 49 - поворот направо
40 - поворот кругом

=== Команда 2 Шагом марш

# Е
33, 24, 15, 19,10, 1, 34, 25, 16, 29, 20, 11, 2 – движение 3 шага вперед
28 с шага 2 движение 1 шаг вперед
28 с шага 3 поворот направо
28 с шага 4 движение 2 шага вперед
26, 35 с шага 4 движение 1 шаг вперед 
26, 35 с шага 5 поворот направо

# К1
3,12,21 - 3 шага вперед
36, 27, 18 – 1 шаг вперед
78, 69 – 2 шага вперед
22 ,13, 4 с шага 3 1 шаг вперед
73 с шага 3 1 шаг вперед
60 – 1 шаг вперед
74 – 1 шаг вперед
52 – 2 шага вперед
61 – 2 шага вперед
70 – 2 шага вперед
79 – 2 шага вперед
55 – 1 шага вперед
46 – 2 шага вперед
41 – 3 шага вперед

# К1
65, 56, 47, 81, 72, 63, 68, 59, 50, 37, 38, 39, 67, 58, 49 - движение 3 шага вперед
54 с шага 4 движение 1 шаг вперед


=== ОП3

# Е
19,10, 1, 2 - поворот направо
33, 24, 15, 34 - поворот налево

# К1

# К2
81, 72, 63, 65, 56, 47, 67, 58, 49 – поворот налево
68, 59, 50, 37, 38, 39 – поворот направо


=== Команда 3 Шагом марш

# Е
19,10, 1, 2, 33, 24, 15, 34, 25, 16, 35, 26 – движение 1 шаг вперед

25 с шага 2 поворот направо
25 с шага 4 движение 3 шага вперед

16 с шага 4 движение 1 шага вперед
16 с шага 5 поворот направо
16 с шага 6 движение 2 шага вперед

35 с шага 5 движение 1 шага вперед 
35 с шага 6 движение 1 шага вперед 
35 с шага 7 поворот направо
35 с шага 8 движение 1 шаг вперед

26 с шага 5 движение 1 шага вперед 
26 с шага 6 движение 1 шага вперед 
26 с шага 8 движение 1 шага вперед 
26 с шага 9 поворот направо

11 с шага 2 движение 1 шаг вперед 
11 с шага 3 поворот налево 
11 с шага 4 движение 3 шага вперед

20 с шага 3 движение 2 шага вперед 
20 с шага 5 поворот налево 
20 с шага 6 движение 2 шага вперед

29 с шага 3 движение 2 шага вперед 
29 с шага 6 движение 1 шага вперед 
29 с шага 6 поворот налево 
29 с шага 7 движение 1 шаг вперед

28 с шага 5 движение 4 шага вперед

# К2
39, 40, 81, 72, 63, 65, 56, 47 – 1 шаг вперед
38 – 2 шага вперед
68, 59, 50, 37 – 3 шага вперед
67 – 2 шага вперед
58 – 3 шага вперед
49 – 4 шага вперед

=== ОП4

Е,К1,К2 - поворот на зрителя

=== МОЛОДЦЫ

пауза 5

=== ИДЕАЛ
# встать ЕКК
`);

return march;
}
