export default function programma(kadets) {

	var march = kadets.create_march();
	kadets.append_stage(march, kadets.create_stage_rectangle(9, 9));

	kadets.append_text(march, `
  ВСЕ = 1-81
  ВСЕ с шага 5 движение 10 шагов
  ВСЕ с шага 14 поворот налево
  1-45 цвет 0,1,0 зеленый
  45-81 цвет 1,0,0 красный
`);

	return march;
}