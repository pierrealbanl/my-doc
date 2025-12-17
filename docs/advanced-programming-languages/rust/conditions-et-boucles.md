---
id: conditions-et-boucles
title: 2. Les conditions et boucles
---

# Les conditions et boucles

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

## 2.2. Le pattern matching

Comme en Haskell, Rust propose le pattern matching. La différence principale est que, contrairement à Haskell, **le pattern matching ne s’utilise pas directement dans la définition des fonctions, mais à l’intérieur du corps** de celles-ci, principalement avec l’instruction `match`.

```rust
fn main() {
    let n: i32 = 5;

    let result: i32 = match n {
        0 => 0,
        n => n * n * n,
    };
    println!("{result}");
}
```

De la même façon, Rust propose un type équivalent au `Maybe` de Haskell : `Option<T>`. Ce type permet de représenter soit la présence, soit l’absence d’une valeur. Bien que son rôle soit similaire, son implémentation diffère de celle de Haskell.

Les correspondances entre les deux langages sont les suivantes :

> `Maybe a` → `Option<T>`
> 
> `Just a` → `Some(a)`
> 
> `Nothing` → `None`

En pratique, `Some(a)` et `None` sont souvent utilisés dans des constructions conditionnelles, puis manipulés via le pattern matching. Voici un exemple utilisant `Option<T>` pour gérer une division qui peut échouer :

```rust
fn divide(a: i32, b: i32) -> Option<i32> {
    if b == 0 {
        None
    } else {
        Some(a / b)
    }
}

fn main() {
    match divide(10, 0) {
        Some(x) => println!("{x}"),
        None => println!("Error: cannot divide"),
    }
}
```

## 2.3. Les différentes boucles

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
