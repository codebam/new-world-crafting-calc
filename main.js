const material = (name, cost, recipe) => ({
  name,
  cost,
  recipe,
  craft: (amount) => {
    if (recipe.length === 0) {
      return {
        material: { name, cost },
        amount: amount,
        cost: cost * amount,
      };
    }
    let craft = recipe
      .map((ingredient) =>
        ingredient.material.craft(ingredient.amount * amount)
      )
      .reduce(
        (previous, material) => {
          return {
            materials: [...previous.materials, material],
            cost: previous.cost + material.cost,
          };
        },
        {
          materials: [],
          amount,
          cost: 0,
        }
      );
    console.log("crafting", name);
    console.log(
      "crafting cost:",
      craft.cost.toFixed(2),
      "\n" + "      tp cost:",
      (cost * amount).toFixed(2),
      "\n"
    );
    if (craft.cost < cost * amount) {
      return craft;
    }
    return {
      materials: [{ material: { name, cost }, amount, cost }],
      cost: cost * amount,
    };
  },
});

const ingredient = (material, amount) => ({
  material,
  amount,
});

const materials = {};
materials.sand_flux = material("sand_flux", 0.99, []);
materials.tolvium = material("tolvium", 16.8, []);
materials.cinnabar = material("cinnabar", 16.9, []);
materials.obsidian_flux = material("obsidian_flux", 1.07, []);
materials.obsidian_sandpaper = material("obsidian_sandpaper", 0.69, []);
materials.charcoal = material("charcoal", 0.28, []);
materials.orichalcum_ore = material("orichalcum_ore", 2.4, []);
materials.starmetal_ore = material("starmetal_ore", 0.2, []);
materials.iron_ore = material("iron_ore", 0.16, []);
materials.ironwood = material("ironwood", 0.59, []);
materials.wyrdwood = material("wyrdwood", 0.57, []);
materials.coarse_sandpaper = material("coarse_sandpaper", 0.65, []);
materials.wildwood = material("wildwood", 12.2, []);
materials.barbvine = material("barbvine", 13, []);
materials.iron_hide = material("ironhide", 0.1, []);
materials.thick_hide = material("thick_hide", 0.36, []);
materials.rawhide = material("rawhide", 0.15, []);
materials.tannin = material("tannin", 0.14, []);
materials.smolderhide = material("smolderhide", 13.19, []);
materials.scarhide = material("scarhide", 13.9, []);
materials.iron_ingot = material("iron_ingot", 0.52, [
  ingredient(materials.iron_ore, 4),
]);
materials.steel_ingot = material("steel_ingot", 2.16, [
  ingredient(materials.iron_ingot, 3),
  ingredient(materials.sand_flux, 1),
  ingredient(materials.charcoal, 2),
]);
materials.starmetal_ingot = material("starmetal_ingot", 8.5, [
  ingredient(materials.starmetal_ore, 6),
  ingredient(materials.steel_ingot, 2),
  ingredient(materials.sand_flux, 1),
  ingredient(materials.charcoal, 2),
]);
materials.orichalcum_ingot = material("orichalcum_ingot", 32.9, [
  ingredient(materials.orichalcum_ore, 8),
  ingredient(materials.starmetal_ingot, 2),
  ingredient(materials.sand_flux, 1),
  ingredient(materials.charcoal, 2),
]);
materials.asmodeum_cooldown = material("asmodeum_cooldown", 150, []);
materials.asmodeum = material("asmodeum", 405, [
  ingredient(materials.orichalcum_ingot, 5),
  ingredient(materials.tolvium, 1),
  ingredient(materials.cinnabar, 1),
  ingredient(materials.obsidian_flux, 1),
  ingredient(materials.charcoal, 2),
  ingredient(materials.asmodeum_cooldown, 1),
]);
materials.wyrdwood_planks = material("wyrdwood_planks", 5.4, [
  ingredient(materials.wyrdwood, 6),
  ingredient(materials.coarse_sandpaper, 1),
]);
materials.ironwood_planks = material("ironwood_planks", 13.69, [
  ingredient(materials.ironwood, 8),
  ingredient(materials.wyrdwood_planks, 2),
  ingredient(materials.coarse_sandpaper, 1),
]);
materials.glittering_ebony_cooldown = material(
  "glittering_ebony_cooldown",
  20,
  []
);
materials.glittering_ebony = material("glittering_ebony", 104.96, [
  ingredient(materials.ironwood_planks, 5),
  ingredient(materials.wildwood, 1),
  ingredient(materials.barbvine, 1),
  ingredient(materials.obsidian_sandpaper, 1),
  ingredient(materials.glittering_ebony_cooldown, 1),
]);
materials.coarse_leather = material("coarse_leather", 0.53, [
  ingredient(materials.rawhide, 4),
]);
materials.rugged_leather = material("rugged_leather", 0.95, [
  ingredient(materials.coarse_leather, 4),
  ingredient(materials.tannin, 1),
]);
materials.layered_leather = material("layered_leather", 4.95, [
  ingredient(materials.thick_hide, 6),
  ingredient(materials.rugged_leather, 2),
  ingredient(materials.tannin, 1),
]);
materials.infused_leather = material("infused_leather", 5.9, [
  ingredient(materials.iron_hide, 8),
  ingredient(materials.layered_leather, 2),
  ingredient(materials.tannin, 1),
]);
materials.life_mote = material("life_mote", 0.57, []);
materials.life_wisp = material("life_wisp", 2.98, [
  ingredient(materials.life_mote, 5),
]);
materials.life_essence = material("life_essence", 8.62, [
  ingredient(materials.life_wisp, 4),
]);
materials.life_quintessence = material("life_quintessence", 27.76, [
  ingredient(materials.life_essence, 3),
]);
materials.runic_leather_cooldown = material("runic_leather_cooldown", 20, []);
materials.runic_leather = material("runic_leather", 160, [
  ingredient(materials.infused_leather, 5),
  ingredient(materials.smolderhide, 1),
  ingredient(materials.scarhide, 1),
  ingredient(materials.runic_leather_cooldown, 1),
]);
materials.timeless_life_staff_shard = material(
  "timeless_life_staff_shard",
  424,
  []
);
materials.sliver_of_crystalized_azoth = material(
  "sliver_of_crystalized_azoth",
  1245,
  []
);
materials.orichalcum_life_staff = material("orichalcum_life_staff", 100000, [
  ingredient(materials.glittering_ebony, 8),
  ingredient(materials.asmodeum, 5),
  ingredient(materials.runic_leather, 4),
  ingredient(materials.life_quintessence, 6),
  ingredient(materials.timeless_life_staff_shard, 1),
  ingredient(materials.sliver_of_crystalized_azoth, 1),
]);

console.log(JSON.stringify(materials.orichalcum_life_staff.craft(1), null, 2));
// console.log(JSON.stringify(materials.starmetal_ingot.craft(2), null, 2));
