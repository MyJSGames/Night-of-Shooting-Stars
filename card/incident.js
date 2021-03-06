'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'incident',
		card:{
			scarlet:{
				type:'zhenfa',
				audio:true,
				fullskin:true,
				enable:true,
				vanish:true,
				selectTarget:-1,
				filterTarget:function(card,player,target){
					return target==player;
				},
				modTarget:true,
				skills:['scarlet_normal','scarlet_win'],
				content:function(){
					target.addIncident(game.createCard('scarlet'));
				},
			},
			sakura:{
				type:'zhenfa',
				fullskin:true,
				enable:true,
				vanish:true,
				selectTarget:-1,
				filterTarget:function(card,player,target){
					return target == player;
				},
				modTarget:true,
				skills:['sakura_normal','sakura_win'],
				content:function(){
					target.addIncident(game.createCard('sakura'));
				}
			},
			imperishable:{
				type:'zhenfa',
				fullskin:true,
				enable:true,
				vanish:true,
				selectTarget:-1,
				filterTarget:function(card,player,target){
					return target == player;
				},
				modTarget:true,
				skills:['imperishable_normal','imperishable_win'],
				content:function(){
					target.addIncident(game.createCard('imperishable'));
				}
			},
			phantasmagoria:{
				type:'zhenfa',
				fullskin:true,
				enable:true,
				vanish:true,
				selectTarget:-1,
				filterTarget:function(card,player,target){
					return target == player;
				},
				modTarget:true,
				skills:['phantasmagoria_normal','phantasmagoria_win'],
				content:function(){
					target.addIncident(game.createCard('phantasmagoria'));
				}
			},
			immaterial:{
				type:'zhenfa',
				fullskin:true,
				enable:true,
				vanish:true,
				selectTarget:-1,
				filterTarget:function(card,player,target){
					return target == player;
				},
				modTarget:true,
				skills:['immaterial_normal','immaterial_win'],
				content:function(){
					target.addIncident(game.createCard('immaterial'));
				}
			},
			sb:{
				type:'zhenfa',
				fullskin:true,
				enable:true,
				vanish:true,
				selectTarget:-1,
				filterTarget:function(card,player,target){
					return target == player;
				},
				modTarget:true,
				skills:['sb_normal','sb_win'],
				content:function(){
					target.addIncident(game.createCard('sb'));
				}
			},
			baka:{
				type:'zhenfa',
				fullskin:true,
				enable:true,
				vanish:true,
				selectTarget:-1,
				filterTarget:function(card,player,target){
					return target == player;
				},
				modTarget:true,
				skills:['baka_normal','baka_win'],
				content:function(){
					target.addIncident(game.createCard('baka'));
				}
			},
			death:{
				type:'zhenfa',
				fullskin:true,
				enable:true,
				vanish:true,
				selectTarget:-1,
				filterTarget:function(card,player,target){
					return target == player;
				},
				modTarget:true,
				skills:['death_normal','death_win'],
				content:function(){
					target.addIncident(game.createCard('death'));
				}
			},
		},
		skill:{
			scarlet_normal:{
    			global:'scarlet_normal2',
			},
			scarlet_normal2:{
				// 感觉好像会出bug……
				mod:{
					attackFrom:function(from,to,distance){
						return distance-game.countPlayer(function(current){
							if(current==from) return false;
							if(current.identity=='unknown'||current.identity=='ye') return false;
							if (current.identity=='zhu'&&from.identity=='zhong') return true;
							if(current.identity!=from.identity) return false;
							if(current.hasSkill('scarlet_normal')) return true;
						});
					}
				}
			},
			scarlet_win:{
    			forced:true,
    			trigger:{player:'phaseBegin'},
    			filter:function(event,player){
    				for(var i=0;i<game.players.length;i++){
                        if(game.players[i].isOut()||game.players[i]==player) continue;
                        if(game.players[i].lili>=player.lili) return false;
                    }
    				return player.isMaxHp(true);
    			},
    			content:function(){
    				player.$skill('红月胜利',null,null,true);
    				game.incidentover(player,'scarlet');
				},
				ai:{
					threaten:function(player, target){
						if (target.hp == target.MaxHp) return 2;
						return 1;
					},
				},
    		},
    		sakura_normal:{
    			trigger:{global:'dying'},
				forced:true,
				check:function(){
					return false;
				},
				filter:function(event,player){
					return true;
				},
				content:function(){
					player.gainlili();
				},
    		},
    		sakura_win:{
				forced:true,
				skillAnimation:true,
    			trigger:{player:'phaseBegin'},
    			filter:function(event,player){
    				return player.isMinHandcard(true) && player.isMinHp(true);
    			},
    			content:function(){
    				player.$skill('散樱胜利',null,null,true);
    				game.incidentover(player,'sakura');
				},
				ai:{
					threaten:function(player, target){
						if (target.hp == 1) return 2;
						return 0.7;
					},
				},	
    		},
    		imperishable_normal:{
    			trigger:{global:'loseEnd'},
    			forced:true,
    			filter:function(event,player){
    				return event.player.countCards('j') == 0;
    			},
    			content:function(){
    				trigger.player.logSkill(this);
					trigger.player.drawSkill();
				},
    		},
    		imperishable_win:{
    			trigger:{player:'phaseBegin'},
    			forced:true,
    			mark:true,
    			init:function (player){
    				player.storage.imperishable_win = 1;
    			},
    			intro:{
					marktext:'永',
					content:'mark',
				},
    			filter:function(event,player){
    				return true;
    			},
    			content:function(){
    				player.storage.imperishable_win += 1;
    				player.syncStorage('imperishable_win');
    				player.markSkill('imperishable_win');
    				if (player.storage.imperishable_win == 7){
    					player.$skill('永夜胜利', null, null, true);
    					game.incidentover(player,'imperishable');
    				};
				},
				ai:{
					threaten:function(player, target){
						if (!target.storage.imperishable_win) return 1;
						return Math.max(1,target.storage.imperishable_win - 3); 
					},
				}
    		},
    		phantasmagoria_normal:{
    			trigger:{global:'phaseEnd'},
    			forced:true,
    			filter:function(event,player){
    				return true;
    			},
    			content:function(){
    				trigger.player.gainlili();
    			},
    		},
    		phantasmagoria_win:{
    			trigger:{global:'onWash'},
    			direct:true,
    			skillAnimation:true,
    			filter:function(event,player){
    				return !game.dead || game.dead.length == 0;
    			},
    			content:function(){
    				player.$skill('花映胜利', null, null, true);
    				game.incidentover(player,'phantasmagoria');
				},
				ai:{
					threaten:function(player, target){
						if (!game.dead) return 2;
						return 1;
					}	
				}
    		},
    		immaterial_normal:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.lili > 0;
				},
				content:function(){
					player.useCard({name:'reidaisai'},game.filterPlayer());
					player.loselili();
				},
				ai:{
					order:5,
					result:{
						player:function(player){
							return game.countPlayer(function(current){
								if (get.attitude(player, current) < 0) return -1;
								if (get.attitude(player, current) >= 0) return 1; 
							});
						}
					},
				},
    		},
    		immaterial_win:{
    			trigger:{player:'phaseEnd'},
    			forced:true,
    			direct:true,
    			skillAnimation:true,
    			filter:function(event,player){
    				return true;
    			},
				mark:true,
				intro:{
					content:function(content,player){
						var num=0;
						for(var i=0;i<ui.discardPile.childNodes.length;i++){
							if (ui.discardPile.childNodes[i].name == 'tao') num ++;
						}
						return '弃牌堆里有'+num+'张【葱】';
					}
				},
    			content:function(){
    				var num=0;
					for(var i=0;i<ui.discardPile.childNodes.length;i++){
                        if (ui.discardPile.childNodes[i].name == 'tao') num ++;
                    }
    				if (num >= 8){
    				    player.$skill('萃梦胜利',null,null,true); 
    					game.incidentover(player,'immaterial');
    				}
				},
				ai:{
					threaten:function(player, target){
						if (ui.discardPile.childNodes.length > 70) return 2;
						return 1;
					}	
				}
    		},
			sb1:{
				intro:{
					marktext:'文',
					content:function(storage,player){
						var str = '';
						for (var i = 0; i < player.storage.sb.length; i ++){
							str += get.translation(player.storage.sb[i]) + ',';
						}
						return str;
					}
				},
			},
    		sb_normal:{
				enable:'phaseUse',
				usable:1,
				filterCard:function(card){
					return true;
				},
				filter:function(event,player){
					return player.getCards('he').length > 0;
				},
				viewAs:{name:'caifang'},
				ai:{
					order:5,
					result:{
						target:-0.5,
						player:0.5,
					}
				}
    		},	
    		sb_win:{
				direct:true,
    			trigger:{global:'turnOverAfter'},
				filter:function(event,player){
					return event.player.isTurnedOver();
				},
    			content:function(){
					if (!player.storage.sb1) player.storage.sb1 = [];
					if (!player.storage.sb1.contains(trigger.player.name)) player.storage.sb1.push(trigger.player.name);
					player.syncStorage('sb1');
					player.markSkill('sb1');
    				var players = game.filterPlayer();
    				var win = true;
    				for (var i = 0; i < players.length; i++){
    					if (!player.storage.sb1.contains(players[i].name)) win = false; 
    				}
    				if (win == true){
    					player.$skill('文花胜利',null,null,true);
    					game.incidentover(player,'sb');
    				}
    			},
    		},
    		baka_normal:{
    			// 啊？你以为这个技能有效果的？baka！ 
    		},
    		baka_win:{
    			trigger:{source:'dieAfter'},
    			forced:true,
    			skillAnimation:true,
    			/*
    			init:function(event,player){
    				if (player.getStat('kill')) if (player.getStat('kill') > 1) game.incidentover(player);
    			},
				*/
    			filter:function(event,player){
    				var num=0;
                    for(var j=0;j<player.stat.length;j++){
                        if(player.stat[j].kill!=undefined) num += player.stat[j].kill;
                    }
    				return num > 1;
    			},
    			content:function(){
    				player.$skill('笨蛋胜利',null,null,true);
    				game.incidentover(player,'baka');
				},
				ai:{
					threaten:function(player, target){
						var num=0;
						for(var j=0;j<player.stat.length;j++){
							if(player.stat[j].kill!=undefined) num += player.stat[j].kill;
						}
						if (num > 0) return 3;
						return 1;
					}	
				}
    		},
    		death_normal:{
    			// 不给胜利应该怎么写比较好啊……
    			trigger:{source:'dieAfter'},
				priority:-10,
				forced:true,
				content:function(){
					player.draw(3);
				},
				ai:{
					effect:{
						modAttitudeTo:function(from,to,att){
							return -3;
						},
						modAttitudeFrom:function(from,to,att){
							return -3;
						},
					},
				},
    		},
    		death_win:{
    			skillAnimation:true,
    			trigger:{global:'dieBegin'},
				direct:true,
    			filter:function(event,player){
					var players = game.filterPlayer().remove(event.player);
    				return players.length == 1;
    			},
    			content:function(){
    				game.incidentover(player,'death');
				},
				ai:{
					threaten:3,
				}
			},
		},
		translate:{
			incident:'异变',
			scarlet:'红月',
			scarlet_info:'<u>胜利条件：</u>准备阶段，你的体力值和灵力值均为场上最高（没有之一）。<br/><u>异变效果：</u>与你同阵营的角色的攻击范围+1。',
			scarlet_normal:'【红月】异变效果',
			scarlet_normal_info:'<u>与你同阵营的角色的攻击范围+1。</u>',
			sakura:'散樱',
			sakura_info:'<u>胜利条件：</u>准备阶段，你的体力值和手牌数均为场上最低（没有之一）。<br/><u>异变效果：</u>一名角色进入决死状态时，你获得1点灵力。',
			sakura_normal:'【散樱】异变效果',
			sakura_normal_info:'<u>一名角色进入决死状态时，你获得1点灵力。</u>',
			imperishable:'永夜',
			imperishable_info:'<u>胜利条件：</u>明置此牌后的第7个回合开始时。<br/><u>异变效果：</u>一名角色失去牌后，若没有技能牌，摸一张技能牌。',
			imperishable_normal:'【永夜】异变效果',
			imperishable_normal_info:'<u>一名角色失去牌后，若其没有技能牌，其摸一张技能牌。</u>',
			imperishable_win_bg:'永',
			imperishable_win:'【永夜】异变胜利',
			//imperishable_win_info:'异变发动后的至少第7个你的回合开始时。',
			phantasmagoria:'花映',
			phantasmagoria_info:'<u>胜利条件：</u>牌堆洗牌时，没有角色坠机。<br/><u>异变效果：</u>一名角色的结束阶段，其获得1点灵力。',
			phantasmagoria_normal:'【花映】异变效果',
			phantasmagoria_normal_info:'<u>一名角色的结束阶段，其获得1点灵力。</u>',
			immaterial:'萃梦',
			immaterial_info:'<u>胜利条件：</u>结束阶段，弃牌堆内有8张【葱】。<br/><u>异变效果：</u>一回合一次，你可以消耗1点灵力，视为使用一张【博丽神社例大祭】。',
			immaterial_normal:'【萃梦】异变效果',
			immaterial_normal_info:'<u>一回合一次，你可以消耗1点灵力，视为使用一张【博丽神社例大祭】。</u>',
			immaterial_win:'【萃梦】计数',
			immaterial_win_bg:'萃',
			sb:'文花',
			sb1:'发动过符卡的角色',
			sb_info:'<u>胜利条件：</u>所有存活角色均在此牌明置期间发动过符卡技。<br/><u>异变效果：</u>一回合一次，你可以将一张牌当作【突击采访】使用 。',
			sb_normal:'【文花】异变效果',
			sb_normal_info:'<u>一回合一次，你可以将一张牌当作【突击采访】使用 。</u>',
			baka:'笨蛋',
			baka_info:'<u>胜利条件：</u>你击坠角色后，已击坠过其以外的角色。<br/><u>异变效果：</u>所有数字视为⑨进制。',
			baka_normal:'【笨蛋】效果',
			baka_normal_info:'<u>所有数字视为⑨进制。</u>',
			death:'皆杀',
			death_info:'<u>胜利条件：</u>所有其他角色坠机。<br/><u>异变效果：</u>所有其他角色不能胜利；你不能以【皆杀】以外的方式胜利；你击坠角色后，摸三张牌。',
			death_normal:'【皆杀】异变效果',
			death_normal_info:'【皆杀】以外的所有胜利条件无效；你击坠角色后，摸三张牌。',
		},
		list:[
			//["diamond",1,'sakura'],
		],
	};
});
