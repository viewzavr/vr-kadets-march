/* Библиотека по моделированию марша кадет

   Сущности:
   march - марш кадет
   stage - конкретное положение кадет в некоторый момент времени

   Таким образом march это:
     набор stage - положения кадет на i-й шаг марша
     набор superstages - список глав марша и шаги их начал
 
   Полезные функции:
     * create_march
     * append_stage
     * append_text
     * get_duration
     * compute_stage( march, t ) - вычислит положение кадет в момент шага t (может быть дробное)
     * get_stages( march ) - список состояний по шагам

   Пример использования:

   ``` 
   import * as kadets from "./kadets.js";
   var march = kadets.create_march();
   kadets.append_stage( march, kadets.create_stage_rectangle(5,5) );
   kadets.append_text( march,`
     ВСЕ = 1-25
     ВСЕ с шага 5 движение 10 шагов
     ВСЕ с шага 14 поворот налево
   `);
   // теперь нам доступно compute_stage( march, t ) - раскладка положений по шагам
   ```

   Дискуссия. Можно сделать расчет интерполяцией между шагов, но я предпочел пока прямой вызов функции


*/

////////////// сущность march

export function create_march() {
  var m = {
    stages: [],
    groups: {},
    superstages: [],
    programs: []
  };
  //m.stages.push( setup_kadets_scene( w,h ) ); // первое положение - расстановка
  return m;
}

// здесь step_func это функция которая может вычислить эту стадию
// вплоть до долей до следующего шага
export function append_stage(m, stage, step_func) {
  m.stages.push(stage);
  m.programs.push(step_func);
}

// под вопросом, а надо ли это вообще мне, зачем? можно же внешним образом хранить?
// и на функции append_text не влияет..
export function start_next_superstage(m, title) {
  m.superstages.push({
    title: title,
    step: get_duration(m)
  });
}

/// аксессоры

export function get_duration(m) {
  return m.stages.length; // ну так мы кодируем - по шагам
}

export function get_last_stage(m) {
  return m.stages[m.stages.length - 1];
}

export function get_stages(m) {
  return m.stages;
}

export function get_superstages(m) {
  return m.superstages;
}

///////////// сущность stage

export function create_stage_rectangle(w, h) {
  var ai = {};
  var c = 1;
  for (var i = 0; i < w; i++)
    for (var j = 0; j < h; j++, c++) {
      if (!ai[c]) ai[c] = {};
      ai[c].pos = [j + 1, i + 1];
      ai[c].color = [1, 1, 1];
      ai[c].angle = 270;
      ai[c].anim = 0;
    }
  ai.length = c - 1;
  return ai;
}

export function create_stage_clone(src) {
  return JSON.parse(JSON.stringify(src));
}

////////////////////////////////////////
//// алгоритмы и всякая всячина

export function compute_stage(march, t) {
  var tbase = Math.floor(t);
  if (tbase >= get_duration(march)) return get_last_stage(march);
  var basestage = get_stages(march)[tbase];
  if (!basestage) return create_stage_rectangle(0, 0);
  if (basestage.func) return basestage.func(t - tbase)
  // тут желающие могут воткнуть универсальную интерполяцию состояний как объекта
  return basestage;
}

// вставка текста с разделителем по стадиям ====
export function append_long_text(march, text) {
  var lines = text.split("\n");
  var curblock = "";

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var m = line.match(/={3,} (.+)/);
    if (m) {
      if (curblock.length > 0) {
        append_text(march, curblock);
      }
      curblock = "";
    } else
      curblock = (curblock + "\n" + line.trim()).trim();
  }
  if (curblock.length > 0) {
    append_text(march, curblock);
  }
  /*

    var blocks = text.split(/^\s*={3,} (.+)$/m);
    debugger;
    blocks.forEach( function(b) {
      append_text( march, b );
    })
    */
}


export function append_text(march, text) {
  //debugger;
  //var start_t = getDuration( march );
  var starting_stage = get_last_stage(march);

  var stages = generate_stages(text, starting_stage, march);
  for (var i = 0; i < stages.length; i++) {
    append_stage(march, stages[i]);
  }
}

// по тексту стадии - выдать массив шагов
// допом идет предыдущий шаг, и переменная памяти
export function generate_stages(stage_text, prev_state, memory) {
  var program = parse_program(stage_text, memory);
  console.log('parsed program', program);
  var len = getprogramduration(program);
  var frame = prev_state;
  var acc = [];

  function remember(mi) {
    return function(t_frac) {
      return execute_program(program, t_frac + mi, prev_state, memory);
    }
  }

  for (var i = 0; i <= len; i++) {
    /*
    acc.push( function() {
      return execute_program( program, i, prev_state, memory );
    })
    */
    frame = execute_program(program, i, prev_state, memory);
    frame.func = remember(i);

    acc.push(frame);
  }
  return acc;
}

// по программе и времени внутри нее - выдать состояние в виде stage
// доп вход prev_stage - состояние с которого начинать
export function execute_program(program, time, prev_stage, memory) {
  var rai = create_stage_clone(prev_stage);
  var tt = time;

  for (var q = 0; q < program.length; q++) {
    var rec = program[q];
    if (rec.start > tt) {
      //          console.log("SKIP rec",rec,tt);
      continue;
    }

    var kadets = getkadetsfromtarget(memory, rec.target);
    var lefttime = rec.start + rec.time < tt ? rec.time : tt - rec.start;

    if (rec.type == "shag") {
      for (var k = 0; k < kadets.length; k++) {
        var kadet_name = kadets[k];
        var kadet = rai[kadet_name];

        var newx = kadet.pos[0] + rec.value * Math.cos(kadet.angle * Math.PI / 180) * lefttime / rec.time;
        var newy = kadet.pos[1] + rec.value * Math.sin(kadet.angle * Math.PI / 180) * lefttime / rec.time;

        kadet.pos = [newx, newy];

        //var stepstpee
        kadet.anim = kadet.anim + rec.value * 50 * lefttime / rec.time;
        //if (kadet.anim > 0)     debugger;
      }
    }
    if (rec.type == "sdvig") {
      for (var k = 0; k < kadets.length; k++) {
        var kadet_name = kadets[k];
        var kadet = rai[kadet_name];

        var newx = kadet.pos[0] + rec.value * Math.cos((kadet.angle + 90) * Math.PI / 180) * lefttime / rec.time;
        var newy = kadet.pos[1] + rec.value * Math.sin((kadet.angle + 90) * Math.PI / 180) * lefttime / rec.time;

        kadet.pos = [newx, newy];
      }
    } else if (rec.type == "povorot") {
      for (var k = 0; k < kadets.length; k++) {
        var kadet_name = kadets[k];
        var kadet = rai[kadet_name];
        if (!kadet) debugger;

        if (rec.value == 1001) {
          kadet.angle = kadet.angle + (270 - kadet.angle) * lefttime / rec.time;
        } else
          kadet.angle = kadet.angle + rec.value * lefttime / rec.time;

        kadet.anim = 0;
      }
    } else if (rec.type == "rovno") {
      for (var k = 0; k < kadets.length; k++) {
        var kadet_name = kadets[k];
        var kadet = rai[kadet_name];
        kadet.pos[0] = Math.round(kadet.pos[0] * 2) / 2;
        kadet.pos[1] = Math.round(kadet.pos[1] * 2) / 2;
        kadet.angle = Math.round(kadet.angle / 15) * 15;

        kadet.anim = 0;
      }
    } else if (rec.type == "color") {
      //console.log("setting color to kadets=",kadets);
      //debugger;
      for (var k = 0; k < kadets.length; k++) {
        var kadet_name = kadets[k];
        var kadet = rai[kadet_name];
        kadet.color = parsecolor(rec.value);
      }
    }

  }
  return rai;
}


// преобразовать текст в "программу"
// доп вход - память, где можно сохранять инфу по группам и тп
export function parse_program(stage_text, memory) {
  var lines = stage_text.split("\n");
  var program = [];
  var groups = memory.groups;

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.length == 0) continue;
    var m = line.match(/#/);
    if (m) continue;
    m = line.match(/(.+) = (.+)/);
    if (m) {
      groups[m[1]] = m[2].split(/[ ,]+/).map(function(v) {
        return v;
      });
      continue;
    }

    m = line.match(/(.+) (с шага (\d+) (.+)|(-|\u2013) (.+))/);

    if (m) {
      var target = m[1];
      var cmd = m[6] || m[4];
      var start = m[6] ? 1 : parseFloat(m[3]);
      var m2;

      m2 = cmd.match(/сдвиг ((\d|\.)+)/);
      if (m2) {
        var time = parseFloat(m2[3] || m2[1]);
        if (isNaN(time))
          console.error("ошибка парсинга строки, time=NaN", line, "m2=", m2);
        var rec = {
          type: "sdvig",
          start: start,
          value: time,
          target: target,
          time: time
        };
        program.push(rec);
      }


      m2 = cmd.match(/движение ((\d|\.)+)|((\d|\.)+) шаг(а)?/);
      if (m2) {
        var time = parseFloat(m2[3] || m2[1]);
        if (isNaN(time))
          console.error("ошибка парсинга строки, time=NaN", line, "m2=", m2);
        var rec = {
          type: "shag",
          start: start,
          value: time,
          target: target,
          time: time
        };
        program.push(rec);
      }

      m2 = cmd.match(/поворот (\S+)( (\S+))?/);
      if (m2) {
        var rec = {
          type: "povorot",
          start: start,
          target: target,
          value: 0,
          time: 1
        };
        if (m2[1] == "налево") rec.value = 90;
        else if (m2[1] == "направо") rec.value = -90;
        else if (m2[1] == "кругом") rec.value = 180;
        else if (m2[1] == "на" && m2[3] == "зрителя") rec.value = 1001;
        else rec.value = parseFloat(m2[1]);
        program.push(rec);
      }

      m2 = cmd.match(/выровняться/);
      if (m2) {
        var rec = {
          type: "rovno",
          start: start,
          target: target,
          value: 0,
          time: 1
        };
        program.push(rec);
      }

      m2 = cmd.match(/время ((\d|\.)+)/);
      if (m2) {
        var last = program[program.length - 1];
        if (last) last.time = parseFloat(m2[1]);
      }

      continue;
    } // if m

    m = line.match(/пауза (\d+)?/);
    if (m) {
      var last = program[program.length - 1];
      var st = last ? last.start + last.time : 0
      var rec = {
        type: "pause",
        target: "",
        value: 0,
        time: parseFloat(m[1] || "10"),
        start: st
      };
      program.push(rec);
      continue;
    }

    m = line.match(/(.+) цвет (.+)/);
    if (m) {

      var rec = {
        type: "color",
        target: m[1],
        value: m[2],
        time: 0,
        start: 0
      };
      program.push(rec);
      continue;
    }

    /*  
          m = line.match(/встать (.+)/);
          if (m) {
            var r = invoke( m[1] );
            if (r) {
              accstage.start_ai = r;
              continue;
            }
          }
    */

    console.error("СТРОКА НЕ ПОНЯТА!");
  }

  // ok we have program
  return program;
}

// возвращает кол-во шагов, заложенных в этой программе
function getprogramduration(program) {
  var t = 0;
  for (var i = 0; i < program.length; i++) {
    var q = program[i].start + program[i].time;
    if (q > t) t = q;
  }
  return t;

}

// выдать список номеров актеров по цели
// цель = запись[,запись]
// запись = число|имягруппы
// tgt - строка или массив или число
function getkadetsfromtarget(memory, tgt) {
  if (tgt === "") return [];

  if (/^\s*\d+\s*$/.test(tgt))
    return [parseInt(tgt)];

  if (memory.groups[tgt])
    return flatten(getkadetsfromtarget(memory, memory.groups[tgt]));

  var sp = Array.isArray(tgt) ? tgt : tgt.split(/[ ,]+/);

  var kr = sp.indexOf("кроме");
  if (kr > 0) {
    var ok = getkadetsfromtarget(memory, sp.slice(0, kr));
    //debugger;
    var krome = getkadetsfromtarget(memory, sp.slice(kr+1));
    return ok.filter(function(i) {
      return krome.indexOf(i) < 0;
    });
  }

  // если не содержит запятых, и не целое число -- значит должна быть запись о группе
  if (sp.length > 1) {
    var res = sp.map(function(v) {
      return getkadetsfromtarget(memory, v);
    });
    return uniq(flatten(res));
  }

  debugger;

  // возможность указывать перечень через -, например 5-15
  var maybearr = sp[0].split("-");
  if (maybearr.length > 1) {
    var acc = [];
    var i1 = parseInt(maybearr[0]);
    var i2 = parseInt(maybearr[1]);
    while (i1 <= i2) {
      acc.push(i1);
      i1++;
    }
    return acc;
  }
  

  return [];
}

/////////////////////////////////////////////////////

function flatten(arr) {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

function uniq(a) {
  var seen = {};
  return a.filter(function(item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

function parsecolor(col) {
  var s = col.split(/[,]/);
  if (s.length >= 3)
    return [parseFloat(s[0]), parseFloat(s[1]), parseFloat(s[2])];
  return [1, 0, 0];
}