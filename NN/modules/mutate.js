const RandFloat = () => Math.random() 
const RandomClamped = () => RandFloat() - RandFloat()
const Mutate = (chromo) => chromo.map((e, i) => (RandFloat() < 0.3)
                                    ? e += (RandomClamped() * 0.3)
                                    : e)

module.exports = Mutate

const chromo = [0.1, 0.3, 0.5, 0.7, 0.9]
console.log(Mutate(chromo))