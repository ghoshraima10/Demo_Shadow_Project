const { songs } = require('../dataSet/data.js');

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema} = require('graphql');


var sorted = [...songs];

const SongType = new GraphQLObjectType({
    name : "song",
    fields : () => ({
        id : {type : GraphQLInt },
        albumId : {type : GraphQLInt},
        title : {type : GraphQLString}, 
        thumbnailUrl : {type : GraphQLString},
        url : {type : GraphQLString}
    })
});

const RootQuerry = new GraphQLObjectType({
    name : "Root",
    fields : {
        song : {
            type : SongType,
            args : { id : {type : GraphQLInt},},
            resolve(parent,args) {
                return songs.find((song) => song.id === args.id);
            }
        },
        songs : {
            type : new GraphQLList(SongType),
            resolve(parent,args) {
                return songs;
            }
        },
        sortedSongsAZ : {
            type : new GraphQLList(SongType),
            resolve(parent,args) {
                sorted = [...songs];
                return sorted.sort((a, b) => (a.title > b.title) ? 1 : -1);
            }
        },
        sortedSongsZA : {
            
            type : new GraphQLList(SongType),
            resolve(parent,args) {
                sorted = [...songs];
                return sorted.sort((a, b) => (a.title < b.title) ? 1 : -1);
             }
        },
        
        sortedByVowels : {
            type: new GraphQLList(SongType),
            resolve(parent,args){
                sorted = [];
                songs.forEach(element => {
                   if ((element.title[0]=="a"|| element.title[0]=="u"||element.title[0]=="e"||element.title[0]=="i"||element.title[0]=="o"))
                   {
                    sorted.push(element);
                   } 
                });
                return sorted;
            }
        },

        sortedByTitleLength : {
            type: new GraphQLList(SongType),
            resolve(parent,args){
                sorted = [...songs];
                return sorted.sort((a, b) => (a.title.length >= b.title.length) ? 1 : -1);
            }
        },

        sortByGenere : {
            type : new GraphQLList(SongType),
            args : { albumId : {type : GraphQLInt},},
            resolve(parent,args){
                sorted = [];                
                Array.prototype.push.apply(sorted,songs.filter((song) => {return song.albumId === args.albumId-3}));
                Array.prototype.push.apply(sorted,songs.filter((song) => {return song.albumId === args.albumId-2}));
                Array.prototype.push.apply(sorted,songs.filter((song) => {return song.albumId === args.albumId-1}));
                Array.prototype.push.apply(sorted,songs.filter((song) => {return song.albumId === args.albumId}));
                return sorted;
            }
        },

        sortBySearch : {
            type : new GraphQLList(SongType),
            args : { key : {type : GraphQLString},},
            resolve(parent,args){
                sorted = [];                
                Array.prototype.push.apply(sorted,songs.filter((song) => {return song.title.toLowerCase().includes(args.key.toLowerCase())}));
               
                return sorted;
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query : RootQuerry
});