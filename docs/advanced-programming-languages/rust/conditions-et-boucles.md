---
id: conditions-et-boucles
title: 2. Conditions et boucles
---

# Conditions et boucles

## 2.1. Conditions : `if` comme expression

**Les conditions** reposent sur les mêmes principes que dans les autres langages, à l’exception de la syntaxe qui diffère légèrement. Toutefois, Rust va plus loin en permettant d’utiliser les conditions comme des expressions : un `if` peut produire une valeur, qui peut ensuite être affectée à une variable ou retournée par une fonction.

```rust
fn is_valid(n: i32) -> bool {
    if n < 5 {
        true
    } else {
        false
    }
}

fn get_parity(n: i32) -> String {
    let parity: String = if n % 2 == 0 {
        String::from("pair")
    } else {
        String::from("impair")
    };
    parity
}


fn main() {
    is_valid(5);
    get_parity(5);
}
```

## 2.2. Les différentes boucles

**Les boucles** reposent sur les mêmes principes que dans les autres langages, à l’exception de la syntaxe qui diffère légèrement. Toutefois, Rust propose une boucle spécifique au langage, `loop`, qui permet de créer une boucle infinie dont on sort explicitement à l’aide de `break`.

```rust
fn while_loop() -> () {
    let mut i: i32 = 0;

    while i < 5 {
        println!("Boucle while : {i}");
        i = i + 1;
    }
}

fn for_loop() -> () {

    for i in 0..5 {
        println!("Boucle for : {i}");
    }
}

fn infinite_loop() -> () {
    let mut i: i32 = 0;

    // loop est une boucle infinie, l’exécution s’arrête avec break
    loop {
        i = i + 1;
        if i == 5 {
            println!("Boucle infinie : {i}");
            break;
        }
    }
}

fn main() {
    while_loop();
    for_loop();
    infinite_loop();
}
```
