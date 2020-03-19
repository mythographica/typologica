# typologica

Dead Simple naive type checker for JavaScript based on constructor.name

# Idea

[Type Checking](https://en.wikipedia.org/wiki/Type_system#Type_checking) in JavaScript is very complicated for beginners. There is no "common" or "general" types. There are only [Data Types](https://en.wikipedia.org/wiki/Data_type). And everything the rest is something very different from well known and common used meaning of Types. You might be having `null` or `undefined` or something derived from `Object` or other constructors. And all this stuff is not a Type, but Structures. Even `undefined` has it's own constructor, just type "`void 0`" and you will invoke constructor for new `undefined` pointer. Therefore there is a lot of misunderstanding and misconceptions for those who comes to JavaScript from other languages, especially with Strict Typing Systems.

# Concept

Each constructed structure has `instance.constructor.name`, where `instance` is a pointer to our variable and `.constructor.name` is obligatory path, pointing us to the name of constructor, that has been invoked during instance creation. Therefore all non primitive so-called "types" has `.constructor.name`. And what is "non primitive" then? Eh... non Data Types, but something else. What is Data Types, the answer is yes, primitives:

* undefined
* boolean
* string
* number
* symbol
* bigint

You might say: "Hey, Stop! They all have constructors." It is indeed true, they do, but wich sort of constructor do they have? It is a big difference: all that constructors do 
memory allocations for Data, and they then answers the question "which data type is that allocated memory". It is not special, but it is different from everything the rest in JavaScript. All other constructors are for Structures, not for Data. And there is one very special thing: `null`. Null is a superhero, which allows us to have all the other constructors, and it's own constructor itself. It is the only SuperDuperPuperClass, and Singleone, in JavaScript. And it is the only thing the others are derived from. It is so special and the same place so simple: but nobody cares of it, we just used to hate `typeof null === 'object'` and that is it. But instead of doing this, please, just look for the whole system. It is very simple, and very straight, and it might be said: "it is Full".

So, there are only Data Types and Structures, and what is the Next Step. Yes, there is a next step. And this step is `instanceof`. When we construct something, we might be willing to check if we did construction from exactly that constructor in future. And this points us to the next big question in JavaScript: Inheritance. This is very complicated topic, so I'd prefer you try to understand it by yourself. But from the other side, I saw very few people who was able to adsorb this topic well, and I can say it, just because I use JavaScript in development for more than 20 years, yes, I'm old, and I started when there was a war between Netstcape Navigator and Internet Explorer 3~4. That is why I did two novelistic memoirs, so I will try to remember it, and you will try to forgive me I'm suggesting it:

* Romantic, with only one example: [Architecture of Prototype Inheritance in JavaScript](https://dev.to/wentout/architecture-of-prototype-inheritance-in-javascript-ce6/edit)
* Nostalgic, with a lot of memories behind, few examples: [Inheritance in JavaScript : Factory of Constructors with Prototype Chain : point of view from boring nerd](https://dev.to/wentout/inheritance-in-javascript-factory-of-constructors-with-prototype-chain-point-of-view-from-boring-nerd-2ddb)

And this is a place where I have to say sorry, again, because starting from this moment I will think we can share the same meanings.

So, now you see, everything constructed has an `instance.consructor.name`. But hey, what does it mean Constructed? Yes, it means ther was Constructor: special function, invoked with `new` keyword. And we can rely on it, safely. The only exclusion is `Object.create`, but even then, there Was construction, but constructor was `Object`. You might be saying what if I write `{}` or `[]` -- how it was constructed? Yes, it was constructed, by the engine, because there is no other way to simplify this process. It was just lexer helping you with AST making special notes for messing up `[]` with `new Array` and `{}` with `new Object`. And even more, as Arrays are derived from Objects for more than 20 years, for backward compatibility there is a special thing: by the `typeof` checker `Array`s are `Object`s. And yes, `typeof` just checks Data Types (primitives), and `Array` is not Type, it is a Structure. That is why it is `'object'` for `typeof` checker.

Be realistic, it is done that way for more than 20 years ago. And it is useless and pointless to think the other way, even if you wish. And we might don't like this, but the is indeed beauty when we accept and understand it instead of hating it. It is very useful and very simple when you rely on it instead of breaking it. It is more then scalable and there is no good points for making it better, because this system is Full, it is not necessary to extend it with something else. 

So, everything that was constructed (and derived from null) returns 'object' as a result of `typeof` checking. And the special case for it `null` returns `object` too, just because it points to the `.constructor.name` and constructor of `null` is `Object`, the only thing is `null` has no properties, because it is `null` singleton, and we can't get the case of checking `.constructor.name` from `null`.

Keeping all this in mind we might build very simple type cheking system. Just if we be aware of the thing does not implemented, we will get the way how. Through this sequence of checking logic :

1. get the `typeof` of `instance`;
2. if this is not an `'object'`, then it is a primitive, and we might return the answer right now;
3. if it is `null`, if so return `null`;
4. if `.consructor.name` returns `object`, then it is structure, derived strictly from `Object` constructor, no matter how;
5. if `.consructor.name` returns something from primitive constructors, `'String'` or `'Number'` or .., then the answer is that `.name`, `.toLowerCase()`'d;
6. if `.consructor.name` is `'Array'`, `'Date'`, `'Map'`, `'WeakMap'`, `'Set'`, `'WeakSet'` we might again `.toLowerCase()` the answer, because mostly this structures are used for storing Data;

7. I'd personally suggest `'RegExp'`, `'Promise'`, `'Proxy'` and `'Reflect'` as something very tightly coupled with data, but this is my choice, judge me an Issue;

8. The last thing is `'Function'`, and just because this is a very special case, there is a simple answer, we will use direct answer from `typeof` received at `1.`;


All the other types we might be willing to have in this "checker" for our new shiny Type System will receive `.constructor.name` as an automated Profit! It is not necessary to check them deeper, If we will wish we will `.constructor.name`, but we have to use names for constructors, and don't be anonymous. And it is very hard point, but if we will use `instanceof` for other checks we shall rely on our personal feelings, because it is a very is broken thing after `Object.create`'s dawn in JavaScript `;^)`:

```javascript
function foo() {}
var bar = { a: ‘a’};
foo.prototype = bar; // Object {a: "a"}
baz = Object.create(bar); // Object {a: "a"}
baz instanceof foo // true. oops.
```
> Dear Eric, thank you very much for this example. Here is a link of Your wonderful article [Common Misconceptions About Inheritance in JavaScript](
https://medium.com/javascript-scene/common-misconceptions-about-inheritance-in-javascript-d5d9bab29b0a)

So we will either avoid using Object.create if you need that checks, or will invent something like hidden `Symbol`, pointing us to real constructor.
Finally: if we will bring very deep Prototype Chain here, for example Object->Array->Proxy->Object, then we shall use Last `.constructor.name` as a pointer to the LAST derived type. For sure, we might be willing additional typechecks in that case, but that is not so dead simple, isn't it?


# Cons

This library is a simple explanation of how everything works. It is very small, and we may rely on it for better understanding of JavaScript structures, especially `Object`'s derived structures. And, for sure, if we will use this understanding in a combination with other libraries, which does not provide the same level of abstraction in mind, we might fail. Or, from other side we might win with distinguished understanding where did they fail.
