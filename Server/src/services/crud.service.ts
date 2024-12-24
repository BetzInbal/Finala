// import { fifthModel } from "../models/fifth.model";
// import { firstModel } from "../models/first.model";
// import { fourthModel } from "../models/fourth";
// import { locationModel } from "../models/location.model";
// import { secModel } from "../models/sec.model";
// import { sixthModel } from "../models/sixth.model";
// import { thirdModel } from "../models/third.model";
// import { IAttack, ILocation } from "../types/interfaces";
// import { calcCasualties } from "./sid.service";

// const createFirst = async (event: IAttack) => {
//   try {
//     const { attackType, nkill, nwound } = event;
//     const exist = await firstModel.findOne({ attackType });

//     if (!exist) {
//       const newFirst = new firstModel({
//         attackType,
//         numCasualties: await calcCasualties(nkill, nwound),
//       });
//       await newFirst.save();
//     } else {
//       exist.numCasualties = exist.numCasualties + calcCasualties(nkill, nwound);
//       await exist.save();
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };

// const createSec = async (event: IAttack, location: ILocation) => {
//   try {
//     const { nkill, nwound, region, country, city } = event;
//     const exist = await secModel.findOne({ region, country, city });
//     if (!exist) {
//       const newSec = new secModel({
//         region,
//         numCasualties: calcCasualties(nkill, nwound),
//         country,
//         city,
//         locationArr: [location],
//       });
//       await newSec.save();
//     } else {
//       exist.numCasualties = exist.numCasualties + calcCasualties(nkill, nwound);
//       exist.locationArr.push(location);
//       await exist.save();
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };
// const createThird = async (event: IAttack) => {
//   try {
//     const { year, month } = event;

//     const exist = await thirdModel.findOne({ year, month });
//     if (!exist) {
//       const newThird = new thirdModel({ year, month });
//       await newThird.save();
//     } else {
//       exist.numEvent = exist.numEvent + 1;
//       await exist.save();
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };
// const createForth = async (event: IAttack) => {
//   try {
//     const { region } = event;

//     const exist = await fourthModel.findOne({ region });
//     if (!exist) {
//       const newForth = new fourthModel({ region });
//       await newForth.save();
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };
// const CreateFifth = async (event: IAttack) => {
//   try {
//     const { organName, year } = event;

//     const exist = await fifthModel.findOne({
//       organizationName: organName,
//       year,
//     });
//     if (!exist) {
//       const newFifth = new fifthModel({
//         organizationName: organName,
//         year,
//         numEvent: 1,
//       });
//       await newFifth.save();
//     } else {
//       exist.numEvent = exist.numEvent + 1;
//       await exist.save();
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };
// const createSixth = async (event: IAttack) => {
//   try {
//     const { nkill, nwound, region, organName } = event;

//     const exist = await sixthModel.findOne({ organName, region });
//     if (!exist) {
//       const newSixth = new sixthModel({
//         organName,
//         region,
//         numCasualties: calcCasualties(nkill, nwound),
//       });
//       await newSixth.save();
//     } else {
//       exist.numCasualties = exist.numCasualties + calcCasualties(nkill, nwound);
//       await exist.save();
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const createAttack = async (event: IAttack) => {
//   try {
//     const { lat, lon } = event;
//     const location = new locationModel({ lat, lon });
//     await location.save();
//     await createFirst(event);
//     await createSec(event, location);
//     await createThird(event);
//     await createForth(event);
//     await CreateFifth(event);
//     await createSixth(event);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const delFirst = async (event: IAttack) => {
//   try {
//     const { attackType, nkill, nwound } = event;
//     const exist = await firstModel.findOne({ attackType });
//     if (!exist) {
//       throw new Error("no one to delete!");
//     } else {
//       if (exist.numCasualties - calcCasualties(nkill, nwound) >= 0) {
//         exist.numCasualties =
//           exist.numCasualties - calcCasualties(nkill, nwound);
//       }
//       await exist.save();
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };

// const delSec = async (event: IAttack, location: ILocation) => {
//   try {
//     const { nkill, nwound, region, country, city } = event;
//     const exist = await secModel.findOne({ region, country, city });
//     if (!exist) {
//       throw new Error("no one to delete!");
//     } else {
//       const allLocations = await locationModel.findOneAndDelete({
//         lat: location.lat,
//         lon: location.lon,
//       });
//       if (exist.numCasualties - calcCasualties(nkill, nwound) >= 0) {
//         exist.numCasualties =
//           exist.numCasualties - calcCasualties(nkill, nwound);
//       }
//       exist.locationArr.filter(
//         (loc) => loc.lat != location.lat && loc.lon != location.lon
//       );
//       await exist.save();
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };
// const delThird = async (event: IAttack) => {
//   try {
//     const { year, month } = event;
//     const exist = await thirdModel.findOne({ year, month });
//     if (!exist) {
//       throw new Error("no one to delete!");
//     } else {
//       if (exist.numEvent - 1 >= 0) {
//         exist.numEvent = exist.numEvent - 1;
//       }
//       await exist.save();
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };
// const delFifth = async (event: IAttack) => {
//   try {
//     const { organName, year } = event;

//     const exist = await fifthModel.findOne({
//       organizationName: organName,
//       year,
//     });
//     if (!exist) {
//       throw new Error("no one to delete!");
//     } else {
//       if (exist.numEvent - 1 >= 0) {
//         exist.numEvent = exist.numEvent - 1;
//       }
//       await exist.save();
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };
// const delSixth = async (event: IAttack) => {
//   try {
//     const { nkill, nwound, region, organName } = event;
//     const exist = await sixthModel.findOne({ organName, region });
//     if (!exist) {
//       throw new Error("no one to delete!");
//     } else {
//       if (exist.numCasualties - calcCasualties(nkill, nwound) >= 0) {
//         exist.numCasualties =
//           exist.numCasualties - calcCasualties(nkill, nwound);
//       }
//       await exist.save();
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const delAttack = async (event: IAttack) => {
//   try {
//     const { lat, lon } = event;
//     const location = new locationModel({ lat, lon });
//     await location.save();
//     await delFirst(event);
//     await delSec(event, location);
//     await delThird(event);
//     await delFifth(event);
//     await delSixth(event);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const updateAttack = async (event: IAttack) => {
//   try {
//     await delAttack(event);
//     await createAttack(event);
//   } catch (err) {
//     console.log(err);
//   }
// };
