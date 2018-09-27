var url;
if (document.location.hostname == "localhost") {
    url = "http://localhost/trend-app/www/";
} else {
    //var url = "http://192.168.1.6/trend-app/www/";
    url = "http://dev.publixcomunicacao.com.br/trend-app/www/";
}

    //url = "http://192.168.25.7/admin/app/";
   // url = "http://dev.publixcomunicacao.com.br/trend-admin/app/";
	url = "http://spotchecktrend.com.br/trend-admin/app/";
    //url = "http://192.168.25.7/admin/app/"; 
 
 voltar_pergunta = 0;

    $.ajaxSetup({
        cache: false
    });

    // Initialize your app
    var myApp = new Framework7({
        material: true //enable Material theme
    });

    // Export selectors engine
    var $$ = Dom7;

    var mainView = myApp.addView('.mainView', {
        dynamicNavbar: false,
        domCache: false
    });

    var loading = 0;

    //document.addEventListener("resume", onResume, false);
    //document.addEventListener("backbutton", onBackKeyDown, false);
    /*
    navigator.splashscreen.show();
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 2000);
    */
	


    function onBackKeyDown() {
        $$(".back").click();
    }

    document.addEventListener("deviceready", function() {
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(){ console.log("success"); }, function(a) { console.log(a); });

    }, false);

    function onResume() {
        // Handle the resume event
        /*
        if(sessionStorage.getItem("user")) {
            mainView.router.loadPage('selecionar-empresa.html');
        } else {
            mainView.router.loadPage('login.html');
        }
        */
    }

    /*
    if (sessionStorage.getItem("user")) {
        mainView.router.loadPage({
            url: 'programacao-atual.html',
            animatePages: false
        });
    } else {
    */
    //}

    //removerArquivo("spotcheck.json");
    //removerArquivo("resposta.json");


    /*
    myApp.onPageInit('about', function (page) {

        //escreverArquivo("obra.json","obrada", function(existe) {});
        //removerArquivo("obra.json");
        lerArquivo("spotcheck.json", function(conteudo) {
            if(conteudo) {
                alert(conteudo);
            }
        });
    });
    */

    verificaConexao();

    function verificaConexao() {


        $.ajax({
            url: url + 'php/checkConexao.php',
            type: 'POST',
            success: function() {
                if($(".conexao.off").length > 0) {
                    $(".conexao").removeClass("off").addClass("on").text("Aplicativo Online");
                    $(".conexao").animate({bottom: '0px'},400,function() {
                        var v = setTimeout(function() { $(".conexao").animate({bottom: '-25px'}) },1000);
                    })
                }                
            },
            error: function() { 
                if($(".conexao.on").length > 0) {
                    $(".conexao").removeClass("on").addClass("off").text("Aplicativo Offline");
                    $(".conexao").animate({bottom: '0px'},400,function() {
                        var v = setTimeout(function() { $(".conexao").animate({bottom: '-25px'}) },1000);
                    })
                }
            }
        }).always(function() {
            con = setTimeout("verificaConexao()",2000);
        })
    }

    var pag = "login.html";

    mainView.router.loadPage({
        url: pag,
        animatePages: false
    });

    // Callbacks to run specific code for specific pages, for example for About page:
    myApp.onPageInit('login', function(page) {

        if(sessionStorage.getItem("user") != null) {
            if(mainView.url == "login.html") {
                myApp.showPreloader("Login detectado. Aguarde...");
                tm = setTimeout(function() {
                    mainView.router.loadPage('programacao-atual.html');
                    myApp.hidePreloader();
                },2000);
            }
        }
        
     
        $(".reiniciar_spotchecks").click(function() {
        
            lerArquivo("obra.json", function(data) {
                console.log("Obra: "+JSON.stringify(data));

                lerArquivo("query.json", function(data) {
                    console.log("obra: "+JSON.stringify(data));

                    lerArquivo("usuario.json", function(data) {
                        console.log("Usuários: "+JSON.stringify(data));

                        lerArquivo("programacao.json", function(data) {
                            console.log("Programação: "+JSON.stringify(data));

                                lerArquivo("pergunta_em_uso.json", function(data) {
                                console.log("Pergunta em uso: "+JSON.stringify(data));

                                lerArquivo("tema_em_uso.json", function(data) {
                                    console.log("Tema em uso: "+JSON.stringify(data));

                                    lerArquivo("atividade.json", function(data) {
                                        console.log("Atividade: "+JSON.stringify(data));

                                        lerArquivo("localizacao.json", function(data) {
                                            console.log("Localização: "+JSON.stringify(data));

                                            lerArquivo("frente.json", function(data) {
                                                console.log("Frente: "+JSON.stringify(data));

                                                lerArquivo("setor.json", function(data) {
                                                   console.log("Setor: "+JSON.stringify(data));

                                                    lerArquivo("responsavel.json", function(data) {
                                                        console.log("Responsavel: "+JSON.stringify(data));

                                                        lerArquivo("gerencia.json", function(data) {
                                                            console.log("Gerencia: "+JSON.stringify(data));

                                                            lerArquivo("cliente.json", function(data) {
                                                                console.log("Cliente: "+JSON.stringify(data));
                                                            })
                                                        }) 
                                                    })
                                                })
                                            })
                                             
                                        })
                                    })
                                })
                            })
                        })
                        
                    })
                })
            })
                    

            if(confirm("Tem certeza que deseja apagar todos os arquivos?")) {
                apagar_tudo();
            }
        });

        $(".btn-login").off().click(function() {
            if(loading == 0) {
                login();
                loading = 1;
                setTimeout(function() { loading = 0; }, 2000);
            } else {
                console.log("blocked");
            }
        });

        $(document).keypress(function(event) {
            if(loading == 0) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    login();
                }

                loading = 1;
                setTimeout(function() { loading = 0; }, 2000);
            }
        });
    });

    /*
    myApp.onPageInit('selecionar-empresa', function(page) {

        $.ajax({
            url: url + 'php/getEmpresas.php',
            type: 'POST'
        }).done(function(data) {
            $(".lista-empresas").html(data);

            $(".option-empresa").click(function() {
                var id = $(this).attr("data-id");
                var nome = $(this).attr("data-nome");

                localStorage.setItem("empresa_id", id);
                localStorage.setItem("empresa_nome", nome);

                mainView.router.loadPage('selecionar-obra.html');
            });

        });

    });

    myApp.onPageInit('selecionar-obra', function(page) {

        var empresa_id = localStorage.getItem("empresa_id");

        $.ajax({
            url: url + 'php/getObras.php',
            type: 'POST',
            data: {
                empresa_id: empresa_id
            }
        }).done(function(data) {
            obras = data.split("<obras />");
            $(".lista-estabelecimentos").html(obras[0]);
            $(".lista-contratos").html(obras[1]);

            $(".option-obra").click(function() {
                var id = $(this).attr("data-id");
                var nome = $(this).attr("data-nome");

                localStorage.setItem("obra_id", id);
                localStorage.setItem("obra_nome", nome);

                mainView.router.loadPage('programacao-atual.html');
            });
        });

    });
    */

    myApp.onPageInit('programacao-atual', function(page) {
        myApp.hidePreloader();

        var obra_id = localStorage.getItem("obra_id");
        var user = JSON.parse("[" + sessionStorage.getItem("user") + "]");
        var aplicador_id = user[0].id;

        $(".btn-sair-app").click(function() {
            if(confirm("Deseja sair da sua conta?")) {
                sessionStorage.removeItem("user");
                mainView.router.loadPage('login.html');
            }
        })
        /*
        $(".btn-prosseguir-sem-programacao").off().click(function() {
            localStorage.setItem("programacao_id", 0);
            localStorage.setItem("programacao_nome", "Sem programação");
            mainView.router.loadPage('selecionar-spotcheck.html');
        });
        */

        //lerArquivo("programacao.json",function(data) {

        getManyById_2(obra_id, "id_obra", aplicador_id, "aplicador", "programacao.json", function(itens) {

            var total = itens.length;

            var html = '';
            var contador = 0;
            for (var i = 0; i < total; i++) {
                var desativado = "";
                var atual = "";
                var icon = "";
                
                
                var dataFim = new Date(itens[i].data_fim);
                var hoje = new Date();                
                

                if(contador > 0 || itens[i].completado == 1 || (dataFim < hoje) ) { 
                    desativado = 'class="disabled"';
                }
                if(contador == 0 || itens[i].completado == 0) {
                    atual = 'option-programacao-atual ';
                }
                if(itens[i].completado == 1) {
                    icon = 'mdi-checkbox-marked-circle verde';
                } else {
                    icon = 'mdi-calendar';
                } 

                html += '<li '+desativado+'>';
                html +=     '<a data-inicio="'+itens[i].data_inicio+'" data-id="'+itens[i].id+'" data-nome="'+itens[i].nome+'" class="'+atual+'item-link item-content">';
                html +=         '<div class="item-media"><i class="icon mdi '+icon+'"></i></div>';
                html +=         '<div class="item-inner">';
                html +=           '<div class="item-title">'+itens[i].nome+'</div>';
                html +=           '<div class="item-after"><span class="qtd-feitos">0</span>/'+itens[i].qtd_itens+'</div>';
                html +=         '</div>';
                html +=     '</a>';
                html += '</li>'; 

                if(itens[i].completado == 0 && (dataFim > hoje) ) { contador++; }

            }

            $(".lista-programacao").html(html);

            $(".lista-programacao a").each(function() {
                var id_programacao = $(this).attr("data-id");
                var data_inicio = $(this).attr("data-inicio");
                var data_inicio_formatada = data_inicio.split("-");
                data_inicio_formatada = data_inicio_formatada[2] + "/" + data_inicio_formatada[1] + "/" + data_inicio_formatada[0];
                var data_atual = new Date();
                var mes = data_atual.getMonth() + 1;
                if (mes > 12) {
                    mes = 1;
                }
                data_atual = data_atual.getFullYear() + "-" + zero_esq(mes) + "-" + zero_esq(data_atual.getDate());

                var d1 = new Date(data_atual);
                var d2 = new Date(data_inicio);

                lerArquivo("spotcheck.json", function(data) {
                    var total_geral = $(".lista-programacao li").length;
                    var qtd = 0;

                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        if (item["id_programacao"] == id_programacao) {
                            qtd++;
                        }
                    }

                    $(".lista-programacao a[data-id='" + id_programacao + "']").find(".qtd-feitos").text(qtd);

                    if (d1 < d2) {
                        $(".lista-programacao a[data-id='" + id_programacao + "']").parent().addClass("disabled");
                        $(".lista-programacao a[data-id='" + id_programacao + "']").find(".qtd-feitos").parent().text(data_inicio_formatada);
                    }

                    var total_geral = $(".lista-programacao li").length;
                    if (total_geral == 0 || $(".lista-programacao .disabled").length == total_geral) {

                        $(".btn-prosseguir-sem-programacao").show();
                    }

                    $(".option-programacao-atual").click(function() {
                        var id_programacao = $(this).attr("data-id");
                        var nome_programacao = $(this).attr("data-nome");

                        localStorage.setItem("programacao_id", id_programacao);
                        localStorage.setItem("programacao_nome", nome_programacao);

                        mainView.router.loadPage('selecionar-spotcheck.html');
                    });

                });

            });


            
            mudaBotaoSpotcheck('btn-prosseguir-sem-programacao');
        }) //Fecha json

            /*
            $.ajax({
                url: url + 'php/getProgramacaoAtual.php',
                type: 'POST',
                data: {
                    obra_id: obra_id,
                    aplicador_id: aplicador_id
                }
            }).done(function(data) {

                $(".lista-programacao").html(data);

                $(".lista-programacao a").each(function() {
                    var id_programacao = $(this).attr("data-id");
                    var data_inicio = $(this).attr("data-inicio");
                    var data_inicio_formatada = data_inicio.split("-");
                    data_inicio_formatada = data_inicio_formatada[2] + "/" + data_inicio_formatada[1] + "/" + data_inicio_formatada[0];
                    var data_atual = new Date();
                    var mes = data_atual.getMonth() + 1;
                    if (mes > 12) {
                        mes = 1;
                    }
                    data_atual = data_atual.getFullYear() + "-" + zero_esq(mes) + "-" + zero_esq(data_atual.getDate());

                    var d1 = new Date(data_atual);
                    var d2 = new Date(data_inicio);

                    lerArquivo("spotcheck.json", function(data) {
                        var total_geral = $(".lista-programacao li").length;
                        var qtd = 0;

                        for (var i = 0; i < data.length; i++) {
                            var item = data[i];
                            if (item["id_programacao"] == id_programacao) {
                                qtd++;
                            }
                        }

                        $(".lista-programacao a[data-id='" + id_programacao + "']").find(".qtd-feitos").text(qtd);

                        if (d1 < d2) {
                            $(".lista-programacao a[data-id='" + id_programacao + "']").parent().addClass("disabled");
                            $(".lista-programacao a[data-id='" + id_programacao + "']").find(".qtd-feitos").parent().text(data_inicio_formatada);
                        }

                        var total_geral = $(".lista-programacao li").length;
                        if (total_geral == 0 || $(".lista-programacao .disabled").length == total_geral) {

                            $(".btn-prosseguir-sem-programacao").show();
                        }

                        $(".option-programacao-atual").click(function() {
                            var id_programacao = $(this).attr("data-id");
                            var nome_programacao = $(this).attr("data-nome");

                            localStorage.setItem("programacao_id", id_programacao);
                            localStorage.setItem("programacao_nome", nome_programacao);

                            mainView.router.loadPage('selecionar-spotcheck.html');
                        });

                    });

                });

            });

            */



    });

    myApp.onPageInit('selecionar-spotcheck', function(page) {
        //escreverArquivo("spotcheck.json","");
        //escreverArquivo("resposta.json","");

        myApp.hidePreloader();
        $(".btn-voltar-spotchecks").remove();

        //alert(sessionStorage.getItem("user"))
        var obra_id = localStorage.getItem("obra_id");
        var programacao_nome = localStorage.getItem("programacao_nome");

        $(".nome_programacao").html(programacao_nome);

        lerArquivo("spotcheck.json", function(data) {
            var programacao_id = localStorage.getItem("programacao_id");
            $("#status-subprogramacoes").val(''); //Verifica se a programação já foi concluída

            var spotcheck = data;

            var item_html = "";
            var para_enviar_html = "";

            if (spotcheck.length > 0) {

                var num_aberto = 0;
                var num_enviar = 0;
                for (var i = 0; i < spotcheck.length; i++) {
                    var item = spotcheck[i];
                    var user = JSON.parse("[" + sessionStorage.getItem("user") + "]");
                    var id_tecnico = user[0].id;
                    var programacao_id = localStorage.getItem("programacao_id");

                    if (item.id_obra == obra_id && item.id_tecnico == id_tecnico && item.id_programacao == programacao_id) {
                        item_html += "<li>";
                        item_html += '<a data-id="' + item.id + '" data-nome="' + item.nome + '" class="option-checkspot item-link item-content">';
                        item_html += '  <div class="item-media">';
                        if (item.finalizado == 1) {
                            item_html += '            <i class="icon mdi mdi-checkbox-marked-circle" style="color:green; margin: 0px 0px 0px -5px"></i>';
                        } else {
                            item_html += '            <i class="icon mdi mdi-close-circle" style="color:red; margin: 0px 0px 0px -5px"></i>';
                        }
                        if (item.entregue == 1) {
                            item_html += '            <i class="icon mdi mdi-cloud-check" style="color:green; margin: 0px 10px 0px 5px"></i>';
                        } else {
                            item_html += '            <i class="icon mdi mdi-cloud-outline-off" style="color:red; margin: 0px 10px 0px 5px"></i>';
                        }
                        item_html += '        </div>';
                        item_html += '        <div class="item-inner"> ';
                        item_html += '          <div class="item-title">' + (num_aberto + 1) + " - " + item.nome + '</div>';
                        item_html += '          <div class="item-after">' + formata_data(item.data) + '</div>';
                        item_html += '        </div>';
                        item_html += '    </a>';
                        item_html += '</li>';
                        num_aberto++;
                    }

                    if (item.entregue == 0 && item.finalizado == 1 && item.id_obra == obra_id && item.id_tecnico == id_tecnico && item.id_programacao == programacao_id) {
                        para_enviar_html += "<li>";
                        para_enviar_html += '   <label class="label-checkbox item-content">';
                        para_enviar_html += '       <input type="checkbox" name="id-spotcheck-envio" value="' + item.id + '">';
                        para_enviar_html += '       <div class="item-media">';
                        para_enviar_html += '          <i class="icon icon-form-checkbox"></i>';
                        para_enviar_html += '       </div>';
                        para_enviar_html += '       <div class="item-inner" style="margin: 0px 0px 0px -10px;">';
                        para_enviar_html += '           <div class="item-title">' + (num_enviar + 1) + " - " + item.nome + '</div>';
                        para_enviar_html += '           <div class="item-after">' + formata_data(item.data) + '</div>';
                        para_enviar_html += '       </div>';
                        para_enviar_html += '       </div>';
                        para_enviar_html += '   </label>';
                        para_enviar_html += '</li>';
                        num_enviar++;
                    }

                }

                $(".lista-spotchecks").html(item_html);
                $(".lista-spotchecks-para-enviar").html(para_enviar_html);
            }


            var total_para_enviar = $(".lista-spotchecks-para-enviar li").length;

            if (programacao_id == 0) {

                $(".lista-subprogramacao").html('<li><div class="item-content"><div class="item-inner"><div class="item-title"> Sem programação definida.</div></div></div></li>');

            } else {

                //Exibe sub-programação
                getManyById(programacao_id, "id_programacao", "programacao_temas.json", function(itens) {

                    var total = itens.length;

                    var html = '';
                    var contador = 0;
                    for (var i = 0; i < total; i++) {

                        html += '<li>';
                        html += '    <a data-gerencia-id="'+itens[i].id_gerencia+'" data-gerencia="'+itens[i].nome_gerencia+'" data-setor-id="'+itens[i].id_setor+'" data-setor="'+itens[i].nome_setor+'" data-atividade-id="'+itens[i].id_atividade+'" data-atividade="'+itens[i].nome_atividade+'" data-completado="'+itens[i].completado+'" data-qtd="'+itens[i].qtd+'" data-tema="'+itens[i].tema_id+'" data-programacao="'+programacao_id+'" data-id="'+itens[i].id+'" data-nome="'+itens[i].nome+'" class="option-subprogramacao item-link item-content">';
                        html += '        <div class="item-media"><i class="icon mdi mdi-clock"></i></div>';
                        html += '        <div class="item-inner">';
                        html += '          <div class="item-title">'+itens[i].nome+'</div>';
                        html += '          <div class="item-after"><span class="qtd-feitos">0</span>/'+itens[i].qtd+'</div>';
                        html += '        </div>';
                        html += '    </a>';
                        html += '</li>';

                        contador++;
                    }

                    $(".lista-subprogramacao").html(html);

                    var total_geral = $(".lista-subprogramacao a").length;
                    var total_geral_feitos = 0;

                    $(".lista-subprogramacao a").each(function() {
                        var id_tema = $(this).attr("data-tema");
                        var id_programacao = $(this).attr("data-programacao");
                        var id_subprogramacao = $(this).attr("data-id");
                        var total = $(this).attr("data-qtd");
                        var completado = $(this).attr("data-completado");

                        lerArquivo("spotcheck.json", function(data) {
                            //console.log(data);
                            var qtd = 0;

                            for (var i = 0; i < data.length; i++) {
                                var item = data[i];
                                if (item["id_tema"] == id_tema && item["id_programacao"] == id_programacao) {
                                    qtd++;
                                }
                            }

                            $(".lista-subprogramacao a[data-tema='" + id_tema + "'][data-programacao='" + id_programacao + "']").find(".qtd-feitos").text(qtd);
                            if (total <= qtd || completado == 1) {
                                total_geral_feitos++;
                                $(".lista-subprogramacao a[data-id='" + id_subprogramacao + "']").find(".icon").removeClass("mdi-clock").addClass("mdi-checkbox-marked-circle").css("color", "green");
                                $(".lista-subprogramacao a[data-id='" + id_subprogramacao + "']").attr("data-completado", "1");

                                if (completado == 1 && total > qtd) {
                                    $(".lista-subprogramacao a[data-id='" + id_subprogramacao + "']").find(".icon").css("color", "#eb9316");
                                }
                            }

                            if (total_geral_feitos >= total_geral) {
                                $("#status-subprogramacoes").val("concluido");
                                mudaBotaoSpotcheck('btn-programacao');
                            }

                            var total_completado = 0;
                            $(".option-subprogramacao").each(function() {

                                var completado = $(this).attr("data-completado");
                                var subprogramacao_id = $(this).attr("data-id");
                                var nome_gerencia = $(this).attr("data-gerencia");
                                var nome_setor = $(this).attr("data-setor");
                                var nome_atividade = $(this).attr("data-atividade");
                                var nome_tema = $(this).attr("data-nome");

                                var id_gerencia = $(this).attr("data-gerencia-id");
                                var id_setor = $(this).attr("data-setor-id");
                                var id_atividade = $(this).attr("data-atividade-id");
                                var id_tema = $(this).attr("data-tema");

                                $(this).off().click(function() {
                                    localStorage.setItem("subprogramacao_id", subprogramacao_id);
                                    localStorage.setItem("prog_gerencia", nome_gerencia);
                                    localStorage.setItem("prog_setor", nome_setor);
                                    localStorage.setItem("prog_atividade", nome_atividade);
                                    localStorage.setItem("prog_tema", nome_tema);

                                    localStorage.setItem("prog_gerencia_id", id_gerencia);
                                    localStorage.setItem("prog_setor_id", id_setor);
                                    localStorage.setItem("prog_atividade_id", id_atividade);
                                    localStorage.setItem("prog_tema_id", id_tema);
                                    mainView.router.loadPage('spotcheck-justificar.html');
                                });

                                if (completado == 1) {
                                    total_completado++;
                                }

                            });




                        });

                    });


                })
                /*
                $.ajax({
                    url: url + 'php/getSubprogramacao.php',
                    type: 'POST',
                    data: {
                        programacao_id: programacao_id
                    }
                }).done(function(data) {
                    $(".lista-subprogramacao").html(data);

                    var total_geral = $(".lista-subprogramacao a").length;
                    var total_geral_feitos = 0;

                    $(".lista-subprogramacao a").each(function() {
                        var id_tema = $(this).attr("data-tema");
                        var id_programacao = $(this).attr("data-programacao");
                        var id_subprogramacao = $(this).attr("data-id");
                        var total = $(this).attr("data-qtd");
                        var completado = $(this).attr("data-completado");

                        lerArquivo("spotcheck.json", function(data) {
                            var qtd = 0;

                            for (var i = 0; i < data.length; i++) {
                                var item = data[i];
                                if (item["id_tema"] == id_tema && item["id_programacao"] == id_programacao) {
                                    qtd++;
                                }
                            }

                            $(".lista-subprogramacao a[data-tema='" + id_tema + "'][data-programacao='" + id_programacao + "']").find(".qtd-feitos").text(qtd);
                            if (total <= qtd || completado == 1) {
                                total_geral_feitos++;
                                $(".lista-subprogramacao a[data-id='" + id_subprogramacao + "']").find(".icon").removeClass("mdi-clock").addClass("mdi-checkbox-marked-circle").css("color", "green");
                                $(".lista-subprogramacao a[data-id='" + id_subprogramacao + "']").attr("data-completado", "1");

                                if (completado == 1 && total > qtd) {
                                    $(".lista-subprogramacao a[data-id='" + id_subprogramacao + "']").find(".icon").css("color", "#eb9316");
                                }
                            }

                            if (total_geral_feitos >= total_geral) {
                                $("#status-subprogramacoes").val("concluido");
                                mudaBotaoSpotcheck('btn-programacao');
                            }

                            var total_completado = 0;
                            $(".option-subprogramacao").each(function() {

                                var completado = $(this).attr("data-completado");
                                var subprogramacao_id = $(this).attr("data-id");

                                if (completado == 0) {
                                    $(this).off().click(function() {
                                        localStorage.setItem("subprogramacao_id", subprogramacao_id);
                                        mainView.router.loadPage('spotcheck-justificar.html');
                                    });
                                } else {
                                    total_completado++;
                                }

                            });




                        });

                    });
                });
                */
            }


            $(".option-checkspot").off().click(function() {
                var id = $(this).attr("data-id");
                localStorage.setItem("spotcheck_id", id);

                mainView.router.loadPage('spotcheck-inicio.html');
            });




        });


        /*
        //Busca todos os spotchecks salvos no celular
        index.get(obra_id).onsuccess = function(event) {
            var result = event.target.result;
            for(var i = 0; i < result.length; i++) {
                var item = result[i];

                var item_html = "<li>";
                item_html += '<a data-id="'+item.id+'" data-nome="'+item.nome+'" class="option-checkspot item-link item-content">';
                item_html += '  <div class="item-media">';
                                if(item.finalizado == 1) {
                item_html += '            <i class="icon mdi mdi-checkbox-marked-circle" style="color:green"></i>';
                                } else {
                item_html += '            <i class="icon mdi mdi-close-circle" style="color:red"></i>';
                                }
                item_html += '        </div>';
                item_html += '        <div class="item-inner"> ';
                item_html += '          <div class="item-title">Spotcheck '+Number(i+1)+'</div>';
                item_html += '          <div class="item-after">'+formata_data(item.data)+'</div>';
                item_html += '        </div>';
                item_html += '    </a>';
                item_html += '</li>';

                $(".lista-spotchecks").append(item_html)

                $(".option-checkspot").off().click(function() {
                    var id = $(this).attr("data-id");
                    localStorage.setItem("spotcheck_id",id);

                    mainView.router.loadPage('spotcheck-inicio.html');
                });

            }

        }
        */

        /*
        $.ajax({
           url: url+'php/getSpotchecks.php',
           type: 'POST',
           data: { obra_id: obra_id }
        }).done(function(data) {
            $(".lista-spotchecks").html(data);

            $(".option-checkspot").off().click(function() {
                var id = $(this).attr("data-id");
                localStorage.setItem("spotcheck_id",id);

                mainView.router.loadPage('spotcheck-inicio.html');
            });
        });
        */
    });
	
	
	
	
	
	
	
	

    myApp.onPageInit('spotcheck-justificar', function(page) {
        $("input[name=justificativa]").removeAttr("checked");

        var nome_gerencia_prog = localStorage.getItem('prog_gerencia');
        var nome_setor_prog = localStorage.getItem('prog_setor');
        var nome_atividade_prog = localStorage.getItem('prog_atividade');
        var nome_tema_prog = localStorage.getItem('prog_tema');

        $(".detalhes-programacao").html("<strong>GERÊNCIA: </strong>"+nome_gerencia_prog+"<br /><strong>SETOR: </strong>"+nome_setor_prog+"<br /><strong>ATIVIDADE: </strong>"+nome_atividade_prog+"<br /><strong>TEMA: </strong>"+nome_tema_prog+"<br /><a class='button button-fill button-small button-raised preparar-spotcheck'>Preparar Spotcheck</a>");

        $(".btn-justificar").hide();

        $(".preparar-spotcheck").off().click(function() {
            var id_gerencia_prog = localStorage.getItem('prog_gerencia_id');
            var id_setor_prog = localStorage.getItem('prog_setor_id');
            var id_atividade_prog = localStorage.getItem('prog_atividade_id');
            var id_tema_prog = localStorage.getItem('prog_tema_id');

            localStorage.setItem("preparar_gerencia_id",id_gerencia_prog);
            localStorage.setItem("preparar_setor_id",id_setor_prog);
            localStorage.setItem("preparar_atividade_id",id_atividade_prog);
            localStorage.setItem("preparar_tema_id",id_tema_prog);

            localStorage.removeItem("prog_gerencia_id");
            localStorage.removeItem("prog_setor_id");
            localStorage.removeItem("prog_atividade_id");
            localStorage.removeItem("prog_tema_id");

            localStorage.removeItem("spotcheck_id");

            mainView.router.loadPage('spotcheck-inicio.html');

        })


        $(".lista-justificativas li").off().click(function() {
            $(".btn-justificar").show();
        })

        $(".btn-justificar").click(function() {
            var justificativa = $("input[name=justificativa]:checked").val();
            var subprogramacao_id = localStorage.getItem('subprogramacao_id');


            if($("input[name=justificativa]:checked").length > 0) {

                var query = "{\"query\":\"UPDATE programacao_temas SET justificativa = '"+justificativa+"', completado = '1' WHERE id = '"+subprogramacao_id+"';\"}";

                escreverArquivo("query.json", query + ",", 0, function() {
                    mudaAtributo("id", subprogramacao_id, "completado", "1", "programacao_temas.json", function() {
                        mudaAtributo("id", subprogramacao_id, "justificativa", justificativa, "programacao_temas.json", function() {
                            mainView.router.loadPage('selecionar-spotcheck.html');
                        })
                    })
                });

                /*
                $.ajax({
                    url: url + 'php/setJustificativa.php',
                    type: 'POST',
                    data: {
                        subprogramacao_id: subprogramacao_id,
                        justificativa: justificativa
                    }
                }).done(function(data) {
                    mainView.router.loadPage('selecionar-spotcheck.html');
                });
                */
            } else {
                myApp.alert("Escolha uma justificativa.", "Erro");
            }
        });

    });
	
	
	
	
	
	
	
	
	

    myApp.onPageInit('enviando-spotcheck', function(page) {

        var spotcheck_ids = localStorage.getItem('spotchecks_selecionados');
        //spotcheck_ids = spotcheck_ids.split(",");

        if (spotcheck_ids != null) {
            lerArquivo("spotcheck.json", function(data) {

                var spotcheck = data;
                var item_html = "";
                var num = 1;
                if (spotcheck != null && spotcheck != "") {
                    spotcheck_ids = spotcheck_ids.split(",");
                    for (var i = 0; i < spotcheck.length; i++) {
                        var item = spotcheck[i];
                        var user = JSON.parse("[" + sessionStorage.getItem("user") + "]");
                        var id_tecnico = user[0].id;

                        if (spotcheck_ids.indexOf(item.id.toString()) > -1) {
                            item_html += "<li>";
                            item_html += '<a data-id="' + item.id + '" data-nome="' + item.nome + '" class="option-checkspot item-link item-content">';
                            item_html += '  <div class="item-media">';
                            item_html += '            <i class="icon mdi mdi-cloud-outline-off" style="color:red; margin: 0px 10px 0px 5px"></i>';
                            item_html += '        </div>';
                            item_html += '        <div class="item-inner"> ';
                            item_html += '          <div class="item-title">' + (num) + " - " + item.nome + '</div>';
                            item_html += '          <div class="item-after">Pendente</div>';
                            item_html += '        </div>';
                            item_html += '    </a>';
                            item_html += '</li>';
                            num++;
                        }
                    }
                }

                $("#enviando-spotcheck .lista-spotchecks-enviando").html(item_html);

                enviarSpotchecks(spotcheck_ids);

            });
        }
    });

    myApp.onPageInit('spotcheck-inicio', function(page) {

        $("select[name=setor]").attr("disabled", "disabled");
        $("select[name=frente]").attr("disabled", "disabled");
        $("select[name=local]").attr("disabled", "disabled");
        $("select[name=atividade]").attr("disabled", "disabled");
        $("select[name=tema]").attr("disabled", "disabled");
        $("select[name=responsavel]").attr("disabled", "disabled");
        $("select[name=contratada]").attr("disabled", "disabled");
        colorirDisabled();

        $("select[name=mao]").val("Própria");
        $("select[name=mao]").next().find(".item-inner .item-after").html("Própria");

        $("select").change(function() {
            myApp.closeModal('.picker-modal');
        });

        var obra_id = localStorage.getItem("obra_id");
        var spotcheck_id = localStorage.getItem("spotcheck_id");

        var preparar_gerencia_id = localStorage.getItem("preparar_gerencia_id");
        var preparar_setor_id = localStorage.getItem("preparar_setor_id");
        var preparar_atividade_id = localStorage.getItem("preparar_atividade_id");
        var preparar_tema_id = localStorage.getItem("preparar_tema_id");

        if (typeof spotcheck_id != "undefined" && spotcheck_id != null) {

            getById(spotcheck_id, "id", "spotcheck.json", function(item) {

                //Recupera GERÊNCIAS
                getManyById(item.id_obra, "id_obra", "gerencia.json", function(gerencia) {
                   var total_gerencia = gerencia.length;

                   var gerencia_html = "<option selected>Selecione</option>";
                    for(var i = 0; i < total_gerencia; i++) {
                        var selected = "";
                        if(item.id_gerencia == gerencia[i].id) { selected = "selected"; }
                        gerencia_html += '<option value="'+gerencia[i].id+'" '+selected+'>'+gerencia[i].nome+'</option>';
                    }

                    //Recupera SETOR
                    getManyById(item.id_gerencia, "id_gerencia", "setor.json", function(setor) {
                       var total_setor = setor.length;

                       var setor_html = "<option selected>Selecione</option>";
                        for(var i = 0; i < total_setor; i++) {
                            var selected = "";
                            if(item.id_setor == setor[i].id) { selected = "selected"; }
                            setor_html += '<option value="'+setor[i].id+'" '+selected+'>'+setor[i].nome+'</option>';
                        }

                        //Recupera FRENTE
                        getManyById(item.id_setor, "id_setor", "frente.json", function(frente) {
                           var total_frente = frente.length;

                           var frente_html = "<option selected>Selecione</option>";
                            for(var i = 0; i < total_frente; i++) {
                                var selected = "";
                                if(item.id_frente == frente[i].id) { selected = "selected"; }
                                frente_html += '<option value="'+frente[i].id+'" '+selected+'>'+frente[i].nome+'</option>';
                            }

                            //Recupera LOCAL
                            getManyById(item.id_frente, "id_frente", "localizacao.json", function(local) {
                               var total_local = local.length;

                               var local_html = "<option selected>Selecione</option>";
                                for(var i = 0; i < total_local; i++) {
                                    var selected = "";
                                    if(item.id_local == local[i].id) { selected = "selected"; }
                                    local_html += '<option value="'+local[i].id+'" '+selected+'>'+local[i].nome+'</option>';
                                }

                                //Recupera ATIVIDADE
                                getManyById(item.id_setor, "id_setor", "atividade.json", function(atividade) {
                                   var total_atividade = atividade.length;

                                   var atividade_html = "<option selected>Selecione</option>";
                                    for(var i = 0; i < total_atividade; i++) {
                                        var selected = "";
                                        if(item.id_atividade == atividade[i].id) { selected = "selected"; }
                                        atividade_html += '<option value="'+atividade[i].id+'" '+selected+'>'+atividade[i].nome+'</option>';
                                    }

                                    //Recupera TEMA EM USO
                                    getManyById(item.id_atividade, "id_atividade", "tema_em_uso.json", function(tema_em_uso) {
                                       var total_tema_em_uso = tema_em_uso.length;

                                       var tema_html = "<option selected>Selecione</option>";
                                        for(var i = 0; i < total_tema_em_uso; i++) {
                                            var selected = "";
                                            if(item.id_tema == tema_em_uso[i].id) { selected = "selected"; }
                                            tema_html += '<option value="'+tema_em_uso[i].id+'" '+selected+'>'+tema_em_uso[i].nome+'</option>';
                                        }

                                        //Recupera RESPONSÁVEL
                                        getManyById(item.id_gerencia, "id_gerencia", "responsavel.json", function(responsavel) {
                                           var total_responsavel = responsavel.length;

                                           var responsavel_html = "<option selected>Selecione</option>";
                                            for(var i = 0; i < total_responsavel; i++) {
                                                var selected = "";
                                                if(item.id_responsavel == responsavel[i].id) { selected = "selected"; }
                                                responsavel_html += '<option value="'+responsavel[i].id+'" '+selected+'>'+responsavel[i].nome+'</option>';
                                            }

                                            //Recupera TERCEIRO
                                            getManyById(item.id_obra, "id_obra", "terceiro.json", function(terceiro) {
                                               var total_terceiro = terceiro.length;

                                               var terceiro_html = "<option selected>Selecione</option>";
                                                for(var i = 0; i < total_terceiro; i++) {
                                                    var selected = "";
                                                    if(item.id_terceiro == terceiro[i].id) { selected = "selected"; }
                                                    terceiro_html += '<option value="'+terceiro[i].id+'" '+selected+'>'+terceiro[i].nome+'</option>';
                                                }

                                                //Continua...
                                                $("select[name=gerencia]").removeAttr("disabled").html(gerencia_html);
                                                $("select[name=setor]").removeAttr("disabled").html(setor_html);
                                                $("select[name=frente]").removeAttr("disabled").html(frente_html);
                                                $("select[name=local]").removeAttr("disabled").html(local_html);
                                                $("select[name=atividade]").removeAttr("disabled").html(atividade_html);
                                                $("select[name=tema]").removeAttr("disabled").html(tema_html);
                                                $("select[name=responsavel]").removeAttr("disabled").html(responsavel_html);
                                                $("select[name=contratada]").removeAttr("disabled").html(terceiro_html);
                                                $("select[name=mao]").removeAttr("disabled").val($.trim(item.mao));

                                                //DESATIVA TUDO PORQUE ESTÁ EDITANDO
                                                $("select[name=gerencia]").attr("disabled", "disabled");
                                                $("select[name=setor]").attr("disabled", "disabled");
                                                $("select[name=frente]").attr("disabled", "disabled");
                                                $("select[name=local]").attr("disabled", "disabled");
                                                $("select[name=atividade]").attr("disabled", "disabled");
                                                $("select[name=tema]").attr("disabled", "disabled");
                                                $("select[name=responsavel]").attr("disabled", "disabled");
                                                $("select[name=contratada]").attr("disabled", "disabled");
                                                $("select[name=mao]").attr("disabled", "disabled");

                                                $("select").each(function() {
                                                    $(this).next().find('.item-after').html($(this).find('option:selected').text());
                                                });

                                                colorirDisabled();

                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })

                /*
                $.ajax({
                    url: url + 'php/recuperaSpotcheck.php',
                    type: 'POST',
                    data: {
                        id_obra: item.id_obra,
                        id_gerencia: item.id_gerencia,
                        id_setor: item.id_setor,
                        id_frente: item.id_frente,
                        id_local: item.id_local,
                        id_atividade: item.id_atividade,
                        id_tema: item.id_tema,
                        id_responsavel: item.id_responsavel,
                        mao: item.mao,
                        contratada: item.id_terceiro
                    }
                }).done(function(data) {
                    data = data.split("<resposta>");
                    $("select[name=gerencia]").removeAttr("disabled").html(data[0]);
                    $("select[name=setor]").removeAttr("disabled").html(data[1]);
                    $("select[name=frente]").removeAttr("disabled").html(data[2]);
                    $("select[name=local]").removeAttr("disabled").html(data[3]);
                    $("select[name=atividade]").removeAttr("disabled").html(data[4]);
                    $("select[name=tema]").removeAttr("disabled").html(data[5]);
                    $("select[name=responsavel]").removeAttr("disabled").html(data[6]);
                    $("select[name=contratada]").removeAttr("disabled").html(data[7]);
                    $("select[name=mao]").removeAttr("disabled").val($.trim(item.mao));

                    //DESATIVA TUDO PORQUE ESTÁ EDITANDO
                    $("select[name=gerencia]").attr("disabled", "disabled");
                    $("select[name=setor]").attr("disabled", "disabled");
                    $("select[name=frente]").attr("disabled", "disabled");
                    $("select[name=local]").attr("disabled", "disabled");
                    $("select[name=atividade]").attr("disabled", "disabled");
                    $("select[name=tema]").attr("disabled", "disabled");
                    $("select[name=responsavel]").attr("disabled", "disabled");
                    $("select[name=contratada]").attr("disabled", "disabled");
                    $("select[name=mao]").attr("disabled", "disabled");

                    $("select").each(function() {
                        $(this).next().find('.item-after').html($(this).find('option:selected').text());
                    });

                    colorirDisabled();
                });
                */

            });

        }

        if (typeof spotcheck_id == "undefined" || spotcheck_id == null) {

            getManyById(obra_id, "id_obra", "gerencia.json", function(gerencia) {
                var total_gerencia = gerencia.length;

                var gerencia_html = "<option selected>Selecione</option>";
                for(var i = 0; i < total_gerencia; i++) {
                    var selected = '';
                    console.log("Gerência a preparar "+preparar_gerencia_id);
                    if(typeof preparar_gerencia_id != "undefined" && preparar_gerencia_id != null) {
                        if(preparar_gerencia_id == gerencia[i].id) {
                            selected = 'selected';
                        }
                    }
                    gerencia_html += '<option value="'+gerencia[i].id+'" '+selected+'>'+gerencia[i].nome+'</option>';
                }

                $("select[name=gerencia]").html(gerencia_html);

                //PREPARA O RESTANTE
                if(typeof preparar_setor_id != "undefined" && preparar_setor_id != null) {
                    //Recupera SETOR
                    getManyById(preparar_gerencia_id, "id_gerencia", "setor.json", function(setor) {
                       var total_setor = setor.length;

                       var setor_html = "<option selected>Selecione</option>";
                        for(var i = 0; i < total_setor; i++) {
                            var selected = "";
                            if(preparar_setor_id == setor[i].id) { selected = "selected"; }
                            setor_html += '<option value="'+setor[i].id+'" '+selected+'>'+setor[i].nome+'</option>';
                        }

                        //Recupera FRENTE
                        getManyById(preparar_setor_id, "id_setor", "frente.json", function(frente) {
                           var total_frente = frente.length;

                           var frente_html = "<option selected>Selecione</option>";
                            for(var i = 0; i < total_frente; i++) {
                                var selected = "";
                                //if(item.id_frente == frente[i].id) { selected = "selected"; }
                                frente_html += '<option value="'+frente[i].id+'" '+selected+'>'+frente[i].nome+'</option>';
                            }

                            //Recupera LOCAL
                            getManyById(0, "id_frente", "localizacao.json", function(local) {
                               var total_local = local.length;

                               var local_html = "<option selected>Selecione</option>";
                                for(var i = 0; i < total_local; i++) {
                                    var selected = "";
                                    //if(item.id_local == local[i].id) { selected = "selected"; }
                                    local_html += '<option value="'+local[i].id+'" '+selected+'>'+local[i].nome+'</option>';
                                }

                                //Recupera ATIVIDADE
                                getManyById(preparar_setor_id, "id_setor", "atividade.json", function(atividade) {
                                   var total_atividade = atividade.length;

                                   var atividade_html = "<option selected>Selecione</option>";
                                    for(var i = 0; i < total_atividade; i++) {
                                        var selected = "";
                                        if(preparar_atividade_id == atividade[i].id) { selected = "selected"; }
                                        atividade_html += '<option value="'+atividade[i].id+'" '+selected+'>'+atividade[i].nome+'</option>';
                                    }

                                    //Recupera TEMA EM USO
                                    getManyById(preparar_atividade_id, "id_atividade", "tema_em_uso.json", function(tema_em_uso) {
                                       var total_tema_em_uso = tema_em_uso.length;

                                       var tema_html = "<option selected>Selecione</option>";
                                        for(var i = 0; i < total_tema_em_uso; i++) {
                                            var selected = "";
                                            if(preparar_tema_id == tema_em_uso[i].id) { selected = "selected"; }
                                            tema_html += '<option value="'+tema_em_uso[i].id+'" '+selected+'>'+tema_em_uso[i].nome+'</option>';
                                        }

                                        //Recupera RESPONSÁVEL
                                        getManyById(preparar_gerencia_id, "id_gerencia", "responsavel.json", function(responsavel) {
                                           var total_responsavel = responsavel.length;

                                           var responsavel_html = "<option selected>Selecione</option>";
                                            for(var i = 0; i < total_responsavel; i++) {
                                                var selected = "";
                                                //if(item.id_responsavel == responsavel[i].id) { selected = "selected"; }
                                                responsavel_html += '<option value="'+responsavel[i].id+'" '+selected+'>'+responsavel[i].nome+'</option>';
                                            }

                                            //Recupera TERCEIRO
                                            getManyById(obra_id, "id_obra", "terceiro.json", function(terceiro) {
                                               var total_terceiro = terceiro.length;

                                               var terceiro_html = "<option selected>Selecione</option>";
                                                for(var i = 0; i < total_terceiro; i++) {
                                                    var selected = "";
                                                    //if(item.id_terceiro == terceiro[i].id) { selected = "selected"; }
                                                    terceiro_html += '<option value="'+terceiro[i].id+'" '+selected+'>'+terceiro[i].nome+'</option>';
                                                }

                                                //Continua...
                                                $("select[name=gerencia]").removeAttr("disabled").html(gerencia_html);
                                                $("select[name=setor]").removeAttr("disabled").html(setor_html);
                                                $("select[name=frente]").removeAttr("disabled").html(frente_html);
                                                $("select[name=local]").removeAttr("disabled").html(local_html);
                                                $("select[name=atividade]").removeAttr("disabled").html(atividade_html);
                                                $("select[name=tema]").removeAttr("disabled").html(tema_html);
                                                $("select[name=responsavel]").removeAttr("disabled").html(responsavel_html);
                                                $("select[name=contratada]").removeAttr("disabled").html(terceiro_html);
                                                $("select[name=mao]").removeAttr("disabled");


                                                localStorage.removeItem("preparar_gerencia_id");
                                                localStorage.removeItem("preparar_setor_id");
                                                localStorage.removeItem("preparar_atividade_id");
                                                localStorage.removeItem("preparar_tema_id");

                                                $("select").each(function() {
                                                    $(this).next().find('.item-after').html($(this).find('option:selected').text());
                                                });

                                                colorirDisabled();

                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                }
            })
        }

        //CHANGE - Gerências
        $("select[name=gerencia]").change(function() {
            var gerencia_id = $(this).val();

            //Recupera SETORES
            getManyById(gerencia_id, "id_gerencia", "setor.json", function(setor) {
                var total_setor = setor.length;

                var setor_html = "<option selected>Selecione</option>";
                for(var i = 0; i < total_setor; i++) {
                    setor_html += '<option value="'+setor[i].id+'">'+setor[i].nome+'</option>';
                }

                //Recupera RESPONSAVEL
                getManyById(gerencia_id, "id_gerencia", "responsavel.json", function(responsavel) {
                    var total_responsavel = responsavel.length;

                    var responsavel_html = "<option selected>Selecione</option>";
                    for(var i = 0; i < total_responsavel; i++) {
                        responsavel_html += '<option value="'+responsavel[i].id+'">'+responsavel[i].nome+'</option>';
                    }

                    $("select[name=setor]").html(setor_html);
                    $("select[name=responsavel]").html(responsavel_html);
                    $("select[name=setor]").next().find(".item-inner .item-after").html("");
                    $("select[name=frente]").next().find(".item-inner .item-after").html("");
                    $("select[name=local]").next().find(".item-inner .item-after").html("");
                    $("select[name=atividade]").next().find(".item-inner .item-after").html("");
                    $("select[name=tema]").next().find(".item-inner .item-after").html("");
                    $("select[name=responsavel]").next().find(".item-inner .item-after").html("");

                    $("select[name=frente]").attr("disabled", "disabled");
                    $("select[name=local]").attr("disabled", "disabled");
                    $("select[name=tema]").attr("disabled", "disabled");
                    $("select[name=atividade]").attr("disabled", "disabled");

                    if (gerencia_id != "Selecione") {
                        $("select[name=setor]").removeAttr("disabled");
                        $("select[name=responsavel]").removeAttr("disabled");
                    } else {
                        $("select[name=setor]").attr("disabled", "disabled");
                        $("select[name=responsavel]").attr("disabled", "disabled");
                    }
                    colorirDisabled();

                })

            })
        });

        /*
        $.ajax({
            url: url + 'php/getSetoresEResponsaveis.php',
            type: 'POST',
            data: {
                gerencia_id: gerencia_id
            }
        }).done(function(data) {
            data = data.split("<divisao>");
            $("select[name=setor]").html(data[0]);
            $("select[name=responsavel]").html(data[1]);
            $("select[name=setor]").next().find(".item-inner .item-after").html("");
            $("select[name=frente]").next().find(".item-inner .item-after").html("");
            $("select[name=local]").next().find(".item-inner .item-after").html("");
            $("select[name=atividade]").next().find(".item-inner .item-after").html("");
            $("select[name=tema]").next().find(".item-inner .item-after").html("");
            $("select[name=responsavel]").next().find(".item-inner .item-after").html("");

            $("select[name=frente]").attr("disabled", "disabled");
            $("select[name=local]").attr("disabled", "disabled");
            $("select[name=tema]").attr("disabled", "disabled");
            $("select[name=atividade]").attr("disabled", "disabled");

            if (gerencia_id != "Selecione") {
                $("select[name=setor]").removeAttr("disabled");
                $("select[name=responsavel]").removeAttr("disabled");
            } else {
                $("select[name=setor]").attr("disabled", "disabled");
                $("select[name=responsavel]").attr("disabled", "disabled");
            }
            colorirDisabled();

        });
        */

        //CHANGE - Setor
        $("select[name=setor]").change(function() {
            var setor_id = $(this).val();

            //Recupera FRENTE
            getManyById(setor_id, "id_setor", "frente.json", function(frente) {
                var total_frente = frente.length;

                var frente_html = "<option selected>Selecione</option>";
                for(var i = 0; i < total_frente; i++) {
                    frente_html += '<option value="'+frente[i].id+'">'+frente[i].nome+'</option>';
                }

                //Recupera ATIVIDADE
                getManyById(setor_id, "id_setor", "atividade.json", function(atividade) {
                    var total_atividade = atividade.length;

                    var atividade_html = "<option selected>Selecione</option>";
                    for(var i = 0; i < total_atividade; i++) {
                        atividade_html += '<option value="'+atividade[i].id+'">'+atividade[i].nome+'</option>';
                    }

                    $("select[name=frente]").html(frente_html);
                    $("select[name=frente]").next().find(".item-inner .item-after").html("");
                    $("select[name=local]").next().find(".item-inner .item-after").html("");

                    $("select[name=atividade]").html(atividade_html);
                    $("select[name=atividade]").next().find(".item-inner .item-after").html("");
                    $("select[name=tema]").next().find(".item-inner .item-after").html("");

                    $("select[name=frente]").attr("disabled", "disabled");
                    $("select[name=local]").attr("disabled", "disabled");

                    if (setor_id != "Selecione") {
                        $("select[name=frente]").removeAttr("disabled");
                        $("select[name=atividade]").removeAttr("disabled");
                    } else {
                        $("select[name=frente]").attr("disabled", "disabled");
                        $("select[name=atividade]").attr("disabled", "disabled");
                    }

                    colorirDisabled();

                })
            })
        })

        /*
        $.ajax({
            url: url + 'php/getFrenteEAtividades.php',
            type: 'POST',
            data: {
                setor_id: setor_id
            }
        }).done(function(data) {
            data = data.split("<divisao>");
            $("select[name=frente]").html(data[0]);
            $("select[name=frente]").next().find(".item-inner .item-after").html("");
            $("select[name=local]").next().find(".item-inner .item-after").html("");

            $("select[name=atividade]").html(data[1]);
            $("select[name=atividade]").next().find(".item-inner .item-after").html("");
            $("select[name=tema]").next().find(".item-inner .item-after").html("");

            $("select[name=frente]").attr("disabled", "disabled");
            $("select[name=local]").attr("disabled", "disabled");

            if (setor_id != "Selecione") {
                $("select[name=frente]").removeAttr("disabled");
                $("select[name=atividade]").removeAttr("disabled");
            } else {
                $("select[name=frente]").attr("disabled", "disabled");
                $("select[name=atividade]").attr("disabled", "disabled");
            }

            colorirDisabled();
        });
        */

        $("select[name=frente]").change(function() {
            var frente_id = $(this).val();

            //Recupera LOCALIZAÇÃO
            getManyById(frente_id, "id_frente", "localizacao.json", function(local) {
                var total_local = local.length;

                var local_html = "<option selected>Selecione</option>";
                for(var i = 0; i < total_local; i++) {
                    local_html += '<option value="'+local[i].id+'">'+local[i].nome+'</option>';
                }

                $("select[name=local]").html(local_html);
                $("select[name=local]").next().find(".item-inner .item-after").html("");

                $("select[name=local]").removeAttr("disabled");

                $("select[name=local]").attr("disabled", "disabled");

                if (frente_id != "Selecione") {
                    $("select[name=local]").removeAttr("disabled");
                } else {
                    $("select[name=local]").attr("disabled", "disabled");
                }

                colorirDisabled();
            })
        });

        /*
        $.ajax({
            url: url + 'php/getLocal.php',
            type: 'POST',
            data: {
                frente_id: frente_id
            }
        }).done(function(data) {
            $("select[name=local]").html(data);
            $("select[name=local]").next().find(".item-inner .item-after").html("");

            $("select[name=local]").removeAttr("disabled");

            $("select[name=local]").attr("disabled", "disabled");

            if (frente_id != "Selecione") {
                $("select[name=local]").removeAttr("disabled");
            } else {
                $("select[name=local]").attr("disabled", "disabled");
            }

            colorirDisabled();
        });
        */

        $("select[name=atividade]").change(function() {
            var atividade_id = $(this).val();
            var user = JSON.parse("[" + sessionStorage.getItem("user") + "]");
            var area = user[0].area;

            //Recupera TEMA
            getManyById_2_like(atividade_id, "id_atividade", area, "area", "tema_em_uso.json", function(tema_em_uso) {
                var total_tema_em_uso = tema_em_uso.length;

                var tema_em_uso_html = "<option selected>Selecione</option>";
                for(var i = 0; i < total_tema_em_uso; i++) {
                    tema_em_uso_html += '<option value="'+tema_em_uso[i].id+'">'+tema_em_uso[i].nome+'</option>';
                }

                $("select[name=tema]").html(tema_em_uso_html);
                $("select[name=tema]").next().find(".item-inner .item-after").html("");

                $("select[name=tema]").removeAttr("disabled");

                if (atividade_id != "Selecione") {
                    $("select[name=tema]").removeAttr("disabled");
                } else {
                    $("select[name=tema]").attr("disabled", "disabled");
                }

                colorirDisabled();
            })

        });

        /*
        $.ajax({
            url: url + 'php/getTema.php',
            type: 'POST',
            data: {
                atividade_id: atividade_id,
                area: area
            }
        }).done(function(data) {
            //alert(data);
            $("select[name=tema]").html(data);
            $("select[name=tema]").next().find(".item-inner .item-after").html("");

            $("select[name=tema]").removeAttr("disabled");


            if (atividade_id != "Selecione") {
                $("select[name=tema]").removeAttr("disabled");
            } else {
                $("select[name=tema]").attr("disabled", "disabled");
            }

            colorirDisabled();
        });
        */

        $("select[name=mao]").change(function() {
            var mao_tipo = $(this).val();

            if (mao_tipo == "Contratada") {

                //Recupera TEMA
                getManyById(obra_id, "id_obra", "terceiro.json", function(terceiro) {
                    var total_terceiro = terceiro.length;

                    var terceiro_html = "<option selected>Selecione</option>";
                    for(var i = 0; i < total_terceiro; i++) {
                        terceiro_html += '<option value="'+terceiro[i].id+'">'+terceiro[i].nome+'</option>';
                    }

                    $("select[name=contratada]").html(terceiro_html);
                    $("select[name=contratada]").next().find(".item-inner .item-after").html("");

                    $("select[name=contratada]").removeAttr("disabled");

                    if (mao_tipo != "Selecione") {
                        $("select[name=contratada]").removeAttr("disabled");
                    } else {
                        $("select[name=contratada]").attr("disabled", "disabled");
                    }

                    colorirDisabled();
                })

            } else {

                if (mao_tipo == "Própria") {
                    $("select[name=contratada]").attr("disabled", "disabled");
                    $("select[name=contratada]").html("<option value='0'>Nenhuma</option>");
                    $("select[name=contratada]").next().find(".item-inner .item-after").html("Nenhuma");
                    colorirDisabled();
                }

            }
        });


        $(".btn-iniciar-spotcheck a").click(function() {

            var ok = 1;
            $("#form-spotcheck select").each(function() {
                if ($.trim($(this).val()) == "") {
                    ok = 0;
                }
            });

            if (!ok) {
                myApp.alert("Preencha todos os campos para continuar.", "Erro");
            } else {
                var gerencia = $("select[name=gerencia]").val();
                var setor = $("select[name=setor]").val();
                var frente = $("select[name=frente]").val();
                var local = $("select[name=local]").val();
                var atividade = $("select[name=atividade]").val();
                var tema = $("select[name=tema]").val();
                var responsavel = $("select[name=responsavel]").val();
                var mao = $("select[name=mao]").val();
                var obra_id = localStorage.getItem('obra_id');
                var spotcheck_id = localStorage.getItem('spotcheck_id');
                var programacao_id = localStorage.getItem('programacao_id');
                var nome = $("select[name=tema] option:selected").text();
                var contratada = $("select[name=contratada]").val();
                //Verifica se há um spotcheck com este id (spotcheck_id)
                if (spotcheck_id != null) {
                    localStorage.setItem('spotcheck_id', spotcheck_id);
                    mainView.router.loadPage('spotcheck-pergunta.html');
                } else {

                    //O id não existe (spotcheck não existe)

                    var data_atual = new Date();
                    var mes = data_atual.getMonth() + 1;
                    if (mes > 12) {
                        mes = 1;
                    }
                    data_atual = data_atual.getFullYear() + "-" + zero_esq(mes) + "-" + zero_esq(data_atual.getDate()) + " " + zero_esq(data_atual.getHours()) + ":" + zero_esq(data_atual.getMinutes()) + ":" + zero_esq(data_atual.getSeconds());

                    //FAZ LEITURA AQUI
                    lerArquivo("spotcheck.json", function(data) {
                        var spotcheck = data;

                        //if(spotcheck != "") { spotcheck = JSON.parse("["+spotcheck.slice(0,-1)+"]"); }
                        var user = JSON.parse("[" + sessionStorage.getItem("user") + "]");
                        var id_tecnico = user[0].id;

                        spotcheck_id = Number(spotcheck.length) + Number(1);

                        var dados = {
                            nome: nome,
                            id: spotcheck_id,
                            finalizado: '0',
                            entregue: '0',
                            data: data_atual,
                            id_gerencia: gerencia,
                            id_setor: setor,
                            id_frente: frente,
                            id_local: local,
                            id_atividade: atividade,
                            id_tema: tema,
                            id_responsavel: responsavel,
                            mao: mao,
                            id_obra: obra_id,
                            id_tecnico: id_tecnico,
                            id_programacao: programacao_id,
                            id_terceiro: contratada
                        }

                        spotcheck.push(dados);

                        //ESCREVE AQUI
                        escreverArquivo("spotcheck.json", JSON.stringify(dados) + ",", 0, function() {
                            localStorage.setItem('spotcheck_id', spotcheck_id);
                            mainView.router.loadPage('spotcheck-pergunta.html');
                        });

                    });


                }

                /*
                //SALVA NO BANCO
                $.ajax({
                   url: url+'php/iniciaSpotcheck.php',
                   type: 'POST',
                   data: {
                        gerencia : gerencia,
                        setor : setor,
                        frente : frente,
                        local : local,
                        atividade : atividade,
                        tema : tema,
                        responsavel : responsavel,
                        mao : mao,
                        obra_id : localStorage.getItem('obra_id'),
                        spotcheck_id : localStorage.getItem('spotcheck_id')
                   }

                }).done(function(data) {
                    if(data != "") {
                        localStorage.setItem('spotcheck_id',data);
                        mainView.router.loadPage('spotcheck-pergunta.html');
                    }
                });
        */

            }

        });
    });

    myApp.onPageInit('spotcheck-pergunta', function(page) {

        var spotcheck_id = localStorage.getItem('spotcheck_id');

        getById(spotcheck_id, "id", "spotcheck.json", function(item) {

            //Recupera PERGUNTAS
            getManyById(item.id_tema, "id_tema_em_uso", "pergunta_em_uso.json", function(pergunta) {
                var total_pergunta = pergunta.length;

                $(".total_perguntas").text(pergunta.length);
                proxima_pergunta(pergunta);
            })

            /*
            $.ajax({
                url: url + 'php/getPerguntas.php',
                type: 'POST',
                data: {
                    id_tema: item.id_tema
                }
            }).done(function(data) {
                data = JSON.parse(data);
                $(".total_perguntas").text(data.length);
                proxima_pergunta(data);
            });
            */
        });

    });

    myApp.onPageInit('registra-solucao', function(page) {
        id_spotcheck = localStorage.getItem('spotcheck_id');
        id_pergunta = localStorage.getItem('pergunta_id');

        $(".btn-proxima-pergunta").off().click(function() {
            //$(this).off();
            myApp.closeModal('.pop-acao');

            if ($("#solucao").val() == "") {
                myApp.alert("Preencha todos os campos para prosseguir.", "Erro");
            } else {
                var solucao = $("#solucao").val();
                var pergunta_atual = localStorage.getItem("pergunta_atual");
                var pergunta_atual_peso = localStorage.getItem("pergunta_atual_peso");
                var data_atual = new Date();
                var mes = data_atual.getMonth() + 1;
                if (mes > 12) {
                    mes = 1;
                }
                data_atual = data_atual.getFullYear() + "-" + zero_esq(mes) + "-" + zero_esq(data_atual.getDate()) + " " + zero_esq(data_atual.getHours()) + ":" + zero_esq(data_atual.getMinutes()) + ":" + zero_esq(data_atual.getSeconds());
                //Escreve no arquivo
                var resp = {
                    resposta: "solucao",
                    id_spotcheck: id_spotcheck,
                    id_pergunta: id_pergunta,
                    solucao: solucao,
                    data_atual: data_atual,
                    pergunta: pergunta_atual,
                    peso: pergunta_atual_peso
                }

                escreverArquivo("resposta.json", JSON.stringify(resp) + ",", 0, function() {
                    $(".resultado").fadeIn(function() {
                        mainView.router.loadPage('spotcheck-pergunta.html');
                    });
                });

                /*
                $.ajax({
                   url: url+'php/respondePergunta.php',
                   type: 'POST',
                   data: { resposta: "solucao", solucao : solucao, id_spotcheck : id_spotcheck, id_pergunta : id_pergunta }
                }).done(function(data) {
                    mainView.router.loadPage('spotcheck-pergunta.html');
                });
                */
            }

        });
    });

    myApp.onPageInit('registra-sim', function(page) {
        var id_spotcheck = localStorage.getItem('spotcheck_id');
        var id_pergunta = localStorage.getItem('pergunta_id');
        var pergunta_atual = localStorage.getItem("pergunta_atual");

        $("#foto1_sim").val('');
        $("#foto2_sim").val('');
        $("#foto3_sim").val('');

        $(".tirar-foto").click(function() {
            var t = $(this).parent();
            navigator.camera.getPicture(
                function(imageData) {
                    var imageURI = imageData;
                    t.find('.img').height(t.width());
                    t.find('.img').width(t.width());
                    t.find('.img').css("background-image", "url('" + imageURI + "')");
                    t.next().val(imageURI);

                    var fts = [];

                    if ($(".fotos-sim input[name=foto1_sim]").val() != "") {
                        fts.push($(".fotos-sim input[name=foto1_sim]").val());
                    }
                    if ($(".fotos-sim input[name=foto2_sim]").val() != "") {
                        fts.push($(".fotos-sim input[name=foto2_sim]").val());
                    }
                    if ($(".fotos-sim input[name=foto3_sim]").val() != "") {
                        fts.push($(".fotos-sim input[name=foto3_sim]").val());
                    }

                    var fotos = myApp.photoBrowser({
                        photos: fts
                    });

                    $('.fotos-sim .img.bg').off();
                    $('.fotos-sim .img.bg').each(function(index) {
                        $(this).click(function() {
                            fotos.open(index);
                        });
                    });

                    navigator.camera.cleanup();
                },
                function(message) {}, {
                    correctOrientation: true,
                    targetWidth: 500,
                    quality: 25,
                    destinationType: Camera.DestinationType.FILE_URI
                });
        });

        //Ativa a câmera
        $("input[name=foto1_sim]").prev().find(".tirar-foto").click();

        $(".btn-proxima-pergunta").off().click(function() {

            var ti = 0;

            if ($("#foto1_sim").val() == "" && $("#foto2_sim").val() == "" && $("#foto3_sim").val() == "") {

                myApp.alert("Tire pelo menos uma foto para prosseguir.", "Erro");

            } else {
                var foto1 = $("#foto1_sim").val();
                var foto2 = $("#foto2_sim").val();
                var foto3 = $("#foto3_sim").val();

                var data_atual = new Date();
                var mes = data_atual.getMonth() + 1;
                if (mes > 12) {
                    mes = 1;
                }
                var pergunta_atual_peso = localStorage.getItem("pergunta_atual_peso");
                data_atual = data_atual.getFullYear() + "-" + zero_esq(mes) + "-" + zero_esq(data_atual.getDate()) + " " + zero_esq(data_atual.getHours()) + ":" + zero_esq(data_atual.getMinutes()) + ":" + zero_esq(data_atual.getSeconds());

                //Escreve no arquivo
                var resp = {
                    resposta: "sim",
                    id_spotcheck: id_spotcheck,
                    id_pergunta: id_pergunta,
                    foto1: foto1,
                    foto2: foto2,
                    foto3: foto3,
                    data_atual: data_atual,
                    peso: pergunta_atual_peso
                };

                escreverArquivo("resposta.json", JSON.stringify(resp) + ",", 0, function() {
                    $(".resultado").fadeOut(function() {
                        mainView.router.loadPage('spotcheck-pergunta.html');
                    });

                });
            }



        });

    });

    myApp.onPageInit('registra-rd', function(page) {
        var id_spotcheck = localStorage.getItem('spotcheck_id');
        var id_pergunta = localStorage.getItem('pergunta_id');
        var pergunta_atual = localStorage.getItem("pergunta_atual");
        var registra_ti_html = $(".registra-ti-html").html();

        var calendarDateFormat = myApp.calendar({
            input: '#calendar-input-rd',
            dateFormat: 'dd/mm/yyyy',
            toolbarCloseText: 'OK',
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        });

        $(".registrar-ti").html('');

        $("#foto1").val('');
        $("#foto2").val('');
        $("#foto3").val('');
        $("#relato").val('');
        $("#recomendacoes").val('');
        $("#acoes_tomadas").val('');
        $("input[name=criticidade]").removeAttr('checked');

        $("input[name=criticidade]").parent().click(function() {
            if ($(this).find("input").val() == "Intolerável") {
                myApp.popover('.ti-acao', '.registrar-ti');
                $(".ti-sim").click(function() {
                    myApp.closeModal('.ti-acao');
                    $(".registrar-ti").html(registra_ti_html);

                    var target = $(".registrar-ti").top;
                    $('html, body').animate({
                        scrollTop: target
                    }, 500);
                });
                $(".ti-nao").click(function() {
                    myApp.closeModal('.ti-acao');
                    $(".registrar-ti").html('');
                });
            }
        });

        $("#relato").val(pergunta_atual);

        $(".tirar-foto").click(function() {
            var t = $(this).parent();
            navigator.camera.getPicture(
                function(imageData) {
                    var imageURI = imageData;
                    t.find('.img').height(t.width());
                    t.find('.img').width(t.width());
                    t.find('.img').css("background-image", "url('" + imageURI + "')");
                    t.next().val(imageURI);

                    var fts = [];

                    if ($(".fotos-rd input[name=foto1]").val() != "") {
                        fts.push($(".fotos-rd input[name=foto1]").val());
                    }
                    if ($(".fotos-rd input[name=foto2]").val() != "") {
                        fts.push($(".fotos-rd input[name=foto2]").val());
                    }
                    if ($(".fotos-rd input[name=foto3]").val() != "") {
                        fts.push($(".fotos-rd input[name=foto3]").val());
                    }

                    var fotos = myApp.photoBrowser({
                        photos: fts
                    });

                    $('.fotos-rd .img.bg').off();
                    $('.fotos-rd .img.bg').each(function(index) {
                        $(this).click(function() {
                            fotos.open(index);
                        });
                    });

                    navigator.camera.cleanup();
                },
                function(message) {}, {
                    correctOrientation: true,
                    targetWidth: 500,
                    quality: 25,
                    destinationType: Camera.DestinationType.FILE_URI
                });
        });

        $(".btn-proxima-pergunta").off().click(function() {

            var recomen = false;
            var ti = 0;

            if ($(".registrar-ti #recomendacoes").length > 0) {
                var ti = 1;

                if ($(".registrar-ti #recomendacoes").val() == "") {
                    recomen = true;
                }
            }

            if ($("input[name=criticidade]:checked").length < 1  || $("#relato").val() == "" || $("#acoes_tomadas").val() == "" || recomen) {
                //|| ($("#foto1").val() == "" && $("#foto2").val() == "" && $("#foto3").val() == "")

                myApp.alert("Preencha todos os campos para prosseguir.", "Erro"); 

            } else {
                var criticidade = $("input[name=criticidade]:checked").val();
                var foto1 = $("#foto1").val();
                var foto2 = $("#foto2").val();
                var foto3 = $("#foto3").val();
                var relato = $("#relato").val();
                var prazo = $("#calendar-input-rd").val();
                var recomendacoes = $("#recomendacoes").val();
                var acoes_tomadas = $("#acoes_tomadas").val();
                var solucao = "";
                var pergunta_atual = localStorage.getItem("pergunta_atual");
                var pergunta_atual_peso = localStorage.getItem("pergunta_atual_peso");

                var data_atual = new Date();
                var mes = data_atual.getMonth() + 1;
                if (mes > 12) {
                    mes = 1;
                }
                data_atual = data_atual.getFullYear() + "-" + zero_esq(mes) + "-" + zero_esq(data_atual.getDate()) + " " + zero_esq(data_atual.getHours()) + ":" + zero_esq(data_atual.getMinutes()) + ":" + zero_esq(data_atual.getSeconds());

                //Escreve no arquivo
                var resp = {
                    resposta: "rd",
                    id_spotcheck: id_spotcheck,
                    id_pergunta: id_pergunta,
                    solucao: solucao,
                    prazo: prazo,
                    foto1: foto1,
                    foto2: foto2,
                    foto3: foto3,
                    criticidade: criticidade,
                    data_atual: data_atual,
                    relato: relato,
                    ti: ti,
                    recomendacoes: recomendacoes,
                    acoes_tomadas: acoes_tomadas,
                    pergunta: pergunta_atual,
                    peso: pergunta_atual_peso
                };

                escreverArquivo("resposta.json", JSON.stringify(resp) + ",", 0, function() {
                    $(".resultado").fadeOut(function() {
                        mainView.router.loadPage('spotcheck-pergunta.html');
                    });

                });

                /*
                $.ajax({
                   url: url+'php/respondePergunta.php',
                   type: 'POST',
                   data: { resposta: "td", foto1:foto1,foto2:foto2,foto3:foto3,criticidade : criticidade, id_spotcheck : id_spotcheck, id_pergunta : id_pergunta }
                }).done(function(data) {

                    myApp.hidePreloader();
                    myApp.closeModal('.pop-acao');

                    mainView.router.loadPage('spotcheck-pergunta.html');
                });
                */
                //console.log("Code = " + r.responseCode);
                //console.log("Response = " + r.response);
                //console.log("Sent = " + r.bytesSent);

                /* UPLOAD DE IMAGENS */
                /*
                for(var i = 1; i <= 3; i++) {
                    var fileURL=$("#foto"+i).val();

                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                    options.mimeType = "image/jpeg";
                    options.chunkedMode = true;

                    var params = {};
                    params.id_spotcheck = id_spotcheck;
                    params.id_pergunta = id_pergunta;

                    options.params = params;

                    var ft = new FileTransfer();
                    ft.upload(fileURL, encodeURI(url+"php/upload.php"), win, fail, options);

                }
                */
            }



        });

    });

    myApp.onPageInit('registra-tn', function(page) {
        id_spotcheck = localStorage.getItem('spotcheck_id');
        id_pergunta = localStorage.getItem('pergunta_id');
        pergunta_atual = localStorage.getItem("pergunta_atual");

        $("#relato").val('');
        $("#acoes_tomadas").val('');
        $("input[name=criticidade]").removeAttr('checked');
        $("#relato").val(pergunta_atual);

        var calendarDateFormat = myApp.calendar({
            input: '#calendar-input',
            dateFormat: 'dd/mm/yyyy',
            toolbarCloseText: 'OK',
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        });

        $(".btn-proxima-pergunta").off().click(function() {
            myApp.closeModal('.pop-acao');

            if ($("#calendar-input").val() == "" || $("#relato").val() == "" || $("#acoes_tomadas").val() == "") {
                myApp.alert("Preencha todos os campos para prosseguir.", "Erro");
            } else {
                var relato = $("#relato").val();
                //var criticidade = $("input[name=criticidade]:checked").val();
                var prazo = $("#calendar-input").val();
                var acoes_tomadas = $("#acoes_tomadas").val();
                var pergunta_atual = localStorage.getItem("pergunta_atual");
                var pergunta_atual_peso = localStorage.getItem("pergunta_atual_peso");

                var data_atual = new Date();
                var mes = data_atual.getMonth() + 1;
                if (mes > 12) {
                    mes = 1;
                }
                data_atual = data_atual.getFullYear() + "-" + zero_esq(mes) + "-" + zero_esq(data_atual.getDate()) + " " + zero_esq(data_atual.getHours()) + ":" + zero_esq(data_atual.getMinutes()) + ":" + zero_esq(data_atual.getSeconds());

                //Escreve no arquivo
                var resp = {
                    resposta: "tn",
                    id_spotcheck: id_spotcheck,
                    id_pergunta: id_pergunta,
                    prazo: prazo,
                    data_atual: data_atual,
                    relato: relato,
                    acoes_tomadas: acoes_tomadas,
                    pergunta: pergunta_atual,
                    peso: pergunta_atual_peso
                }

                escreverArquivo("resposta.json", JSON.stringify(resp) + ",", 0, function() {
                    $(".resultado").fadeOut(function() {
                        mainView.router.loadPage('spotcheck-pergunta.html');
                    });

                });
                /*
                $.ajax({
                   url: url+'php/respondePergunta.php',
                   type: 'POST',
                   data: { resposta: "tn", prazo: prazo,criticidade : criticidade, id_spotcheck : id_spotcheck, id_pergunta : id_pergunta }
                }).done(function(data) {
                    mainView.router.loadPage('spotcheck-pergunta.html');
                });
                */
            }

        });

    });

    /*
    myApp.onPageInit('ver-resposta', function(page) {
        id_resposta = localStorage.getItem('resposta_id');

        $.ajax({
            url: url + 'php/getResposta.php',
            type: 'POST',
            data: {
                id_resposta: id_resposta
            }
        }).done(function(data) {
            $(".ver-resp").html(data);
            $('.img.bg').height($('.img.bg').width());
            $('.img.bg').width($('.img.bg').width());

            var fts = [];

            if ($(".fotos-rd .foto1").attr("ft") != "") {
                fts.push($(".fotos-rd .foto1").attr("ft"));
            }
            if ($(".fotos-rd .foto2").attr("ft") != "") {
                fts.push($(".fotos-rd .foto2").attr("ft"));
            }
            if ($(".fotos-rd .foto3").attr("ft") != "") {
                fts.push($(".fotos-rd .foto3").attr("ft"));
            }

            var fotos = myApp.photoBrowser({
                photos: fts
            });

            $('.fotos-rd .img.bg').off();
            $('.fotos-rd .img.bg').each(function(index) {
                $(this).click(function() {
                    fotos.open(index);
                });
            });

        });

    });
    */

function sincronizar(lista,id_obra,id_usuario) {
    lista = lista.split(",");

    lerArquivo("sincronia.json", function(sinc) {

        var ultima = "";
        if(sinc.length > 0) {
            ultima = JSON.stringify(sinc);
        }

        lerArquivo("query.json", function(queries) {
            queries = JSON.stringify(queries);

            $.ajax({
                url: url + 'php/sincronia.php',
                type: 'POST',
                cache: false,
                timeout: 0,
                data: {
                    id_obra: id_obra,
                    id_usuario: id_usuario,
                    ultima: ultima
                },
                beforeSend: function() {
                    myApp.showPreloader("Sincronizando...");
                },
                error: function(erro) {
                    mainView.router.loadPage({
                        url: 'programacao-atual.html',
                        animatePages: false
                    });
                },
                success: function(data) {
                    console.log(data); 

                    //Apaga Queries, pois já foram inseridas na sincronia
                    escreverArquivo("query.json", "", 1); //Queries que serão executadas assim que houver conexão

                    //Os dados a serem adicionados não devem usar [ ], e devem ser terminados com vírgula
                    //Porque na leitura, esses caracteres são adicionados e a vírgula é tratada
                    var obra = cliente = gerencia = responsavel = setor = frente = localizacao = atividade = tema_em_uso = pergunta_em_uso = programacao = programacao_temas = terceiro = usuarios = sincronia = "";

                    //OBRA
                        obra = JSON.stringify(data.obra);
                        lerArquivo("obra.json",function(dados) {
                            //if(typeof data.obra != "undefined" && data.obra != "") {
                                var json = JSON.stringify(data.obra); json = json.split("[").join("").split("]").join("");
                                obra = updateSincronia(dados,JSON.parse("["+json+"]"));
                            //}
                            obra = obra.split("[").join("").split("]").join("")+","; obra = obra.split(",,").join(",");
                            //CLIENTE
                                cliente = JSON.stringify(data.cliente);
                                lerArquivo("cliente.json",function(dados) {
                                    //if(typeof data.cliente != "undefined" && data.cliente != "") {
                                        var json = JSON.stringify(data.cliente); json = json.split("[").join("").split("]").join("");
                                        cliente = updateSincronia(dados,JSON.parse("["+json+"]"));
                                    //}
                                    cliente = cliente.split("[").join("").split("]").join("")+","; cliente = cliente.split(",,").join(",");
                                    //alert("O que será armazenado: "+cliente);

                                    //GERÊNCIA
                                        gerencia = JSON.stringify(data.gerencia);
                                        lerArquivo("gerencia.json",function(dados) {
                                            //if(typeof data.gerencia != "undefined" && data.gerencia != "") {
                                                var json = JSON.stringify(data.gerencia); json = json.split("[").join("").split("]").join("");
                                                gerencia = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                //gerencia = gerencia.replace("[","").replace("]","")+",";
                                            //}
                                            gerencia = gerencia.split("[").join("").split("]").join("")+",";

                                            //RESPONSÁVEL
                                                responsavel = JSON.stringify(data.responsavel);
                                                lerArquivo("responsavel.json",function(dados) {
                                                    //if(typeof data.responsavel != "undefined" && data.responsavel != "") {
                                                        var json = JSON.stringify(data.responsavel); json = json.split("[").join("").split("]").join("");
                                                        responsavel = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                        //responsavel = responsavel.replace("[","").replace("]","")+",";
                                                    //}
                                                    responsavel = responsavel.split("[").join("").split("]").join("")+","; responsavel = responsavel.split(",,").join(",");

                                                    //SETOR
                                                        responsavel = JSON.stringify(data.setor);
                                                        lerArquivo("setor.json",function(dados) {
                                                            //if(typeof data.setor != "undefined" && data.setor != "") {
                                                                var json = JSON.stringify(data.setor); json = json.split("[").join("").split("]").join("");
                                                                setor = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                                //setor = setor.replace("[","").replace("]","")+",";
                                                            //}
                                                            setor = setor.split("[").join("").split("]").join("")+","; setor = setor.split(",,").join(",");

                                                            //FRENTE
                                                                frente = JSON.stringify(data.frente);
                                                                lerArquivo("frente.json",function(dados) {
                                                                    //if(typeof data.frente != "undefined" && data.frente != "") {
                                                                        var json = JSON.stringify(data.frente); json = json.split("[").join("").split("]").join("");
                                                                        frente = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                                        //frente = frente.replace("[","").replace("]","")+",";
                                                                    //}
                                                                    frente = frente.split("[").join("").split("]").join("")+","; frente = frente.split(",,").join(",");

                                                                    //LOCALIZAÇÃO
                                                                        localizacao = JSON.stringify(data.localizacao);
                                                                        lerArquivo("localizacao.json",function(dados) {
                                                                            //if(typeof data.localizacao != "undefined" && data.localizacao != "") {
                                                                                var json = JSON.stringify(data.localizacao); json = json.split("[").join("").split("]").join("");
                                                                                localizacao = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                                                //localizacao = localizacao.replace("[","").replace("]","")+",";
                                                                            //}
                                                                            localizacao = localizacao.split("[").join("").split("]").join("")+","; localizacao = localizacao.split(",,").join(",");

                                                                            //ATIVIDADE
                                                                                atividade = JSON.stringify(data.atividade);
                                                                                lerArquivo("atividade.json",function(dados) {
                                                                                    //if(typeof data.atividade != "undefined" && data.atividade != "") {
                                                                                        var json = JSON.stringify(data.atividade); json = json.split("[").join("").split("]").join("");
                                                                                        atividade = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                                                        //atividade = atividade.replace("[","").replace("]","")+",";
                                                                                    //}
                                                                                    atividade = atividade.split("[").join("").split("]").join("")+","; atividade = atividade.split(",,").join(",");

                                                                                    //TEMA EM USO
                                                                                        tema_em_uso = JSON.stringify(data.tema_em_uso);
                                                                                        lerArquivo("tema_em_uso.json",function(dados) {
                                                                                            //if(typeof data.tema_em_uso != "undefined" && data.tema_em_uso != "") {
                                                                                                var json = JSON.stringify(data.tema_em_uso); json = json.split("[").join("").split("]").join("");
                                                                                                tema_em_uso = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                                                                //tema_em_uso = tema_em_uso.replace("[","").replace("]","")+",";
                                                                                            //}
                                                                                            tema_em_uso = tema_em_uso.split("[").join("").split("]").join("")+","; tema_em_uso = tema_em_uso.split(",,").join(",");

                                                                                            //PERGUNTA EM USO
                                                                                                pergunta_em_uso = JSON.stringify(data.pergunta_em_uso);
                                                                                                lerArquivo("pergunta_em_uso.json",function(dados) {
                                                                                                    //if(typeof data.pergunta_em_uso != "undefined" && data.pergunta_em_uso != "") {
                                                                                                        var json = JSON.stringify(data.pergunta_em_uso); json = json.split("[").join("").split("]").join("");
                                                                                                        pergunta_em_uso = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                                                                        //pergunta_em_uso = pergunta_em_uso.replace("[","").replace("]","")+",";
                                                                                                    //}
                                                                                                    pergunta_em_uso = pergunta_em_uso.split("[").join("").split("]").join("")+","; pergunta_em_uso = pergunta_em_uso.split(",,").join(",");

                                                                                                    //PROGRAMAÇÃO
                                                                                                        programacao = JSON.stringify(data.programacao);
                                                                                                        lerArquivo("programacao.json",function(dados) {
                                                                                                            //if(typeof data.programacao != "undefined" && data.programacao != "") {
                                                                                                                var json = JSON.stringify(data.programacao); json = json.split("[").join("").split("]").join("");
                                                                                                                programacao = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                                                                                //programacao = programacao.replace("[","").replace("]","")+",";
                                                                                                            //}
                                                                                                            programacao = programacao.split("[").join("").split("]").join("")+","; programacao = programacao.split(",,").join(",");
                                                                                                            //alert("O que já tem "+JSON.stringify(data.programacao)+ "\n O que será inserido: "+programacao);

                                                                                                            //PROGRAMAÇÃO TEMAS
                                                                                                                programacao_temas = JSON.stringify(data.programacao_temas);
                                                                                                                lerArquivo("programacao_temas.json",function(dados) {
                                                                                                                    //if(typeof data.programacao_temas != "undefined" && data.programacao_temas != "") {
                                                                                                                        var json = JSON.stringify(data.programacao_temas); json = json.split("[").join("").split("]").join("");
                                                                                                                        programacao_temas = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                                                                                        //programacao_temas = programacao_temas.replace("[","").replace("]","")+",";
                                                                                                                    //}
                                                                                                                    programacao_temas = programacao_temas.split("[").join("").split("]").join("")+","; programacao_temas = programacao_temas.split(",,").join(",");

                                                                                                                    //TERCEIRO
                                                                                                                        terceiro = JSON.stringify(data.terceiro);
                                                                                                                        lerArquivo("terceiro.json",function(dados) {
                                                                                                                            //if(typeof data.terceiro != "undefined" && data.terceiro != "") {
                                                                                                                                var json = JSON.stringify(data.terceiro); json = json.split("[").join("").split("]").join("");
                                                                                                                                terceiro = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                                                                                                terceiro = terceiro.replace("[","").replace("]","")+",";
                                                                                                                            //}
                                                                                                                            terceiro = terceiro.split("[").join("").split("]").join("")+","; terceiro = terceiro.split(",,").join(",");

                                                                                                                            //USUÁRIOS
                                                                                                                                usuarios = JSON.stringify(data.usuarios);
                                                                                                                                lerArquivo("usuario.json",function(dados) {
                                                                                                                                    //if(typeof data.usuarios != "undefined" && data.usuarios != "") {
                                                                                                                                        var json = JSON.stringify(data.usuarios); json = json.split("[").join("").split("]").join("");
                                                                                                                                        usuarios = updateSincronia(dados,JSON.parse("["+json+"]"));
                                                                                                                                        usuarios = usuarios.replace("[","").replace("]","")+",";
                                                                                                                                    //}
                                                                                                                                    usuarios = usuarios.split("[").join("").split("]").join("")+","; usuarios = usuarios.split(",,").join(",");

                                                                                                                                    //SINCRONIA
                                                                                                                                    //if(typeof data.sincronia != "undefined" && data.sincronia != "") {
                                                                                                                                        sincronia = JSON.stringify(data.sincronia).replace("[","").replace("]","")+",";
                                                                                                                                    //}

                                                                                                                                    escreverArquivo("obra.json", obra, 1, function() {
                                                                                                                                        escreverArquivo("cliente.json", cliente, 1, function() {
                                                                                                                                            escreverArquivo("gerencia.json", gerencia, 1, function() {
                                                                                                                                                escreverArquivo("responsavel.json", responsavel, 1, function() {
                                                                                                                                                    escreverArquivo("setor.json", setor, 1, function() {
                                                                                                                                                        escreverArquivo("frente.json", frente, 1, function() {
                                                                                                                                                            escreverArquivo("localizacao.json", localizacao, 1, function() {
                                                                                                                                                                escreverArquivo("atividade.json", atividade, 1, function() {
                                                                                                                                                                    escreverArquivo("tema_em_uso.json", tema_em_uso, 1, function() {
                                                                                                                                                                        escreverArquivo("pergunta_em_uso.json", pergunta_em_uso, 1, function() {
                                                                                                                                                                            escreverArquivo("programacao.json", programacao, 1, function() {
                                                                                                                                                                                escreverArquivo("programacao_temas.json", programacao_temas, 1, function() {
                                                                                                                                                                                    escreverArquivo("terceiro.json", terceiro, 1, function() {
                                                                                                                                                                                        escreverArquivo("usuario.json", usuarios, 1, function() {
                                                                                                                                                                                            escreverArquivo("sincronia.json", sincronia, 1, function() {

                                                                                                                                                                                                mainView.router.loadPage({
                                                                                                                                                                                                    url: 'programacao-atual.html',
                                                                                                                                                                                                    animatePages: false
                                                                                                                                                                                                });


                                                                                                                                                                                            });
                                                                                                                                                                                        });
                                                                                                                                                                                    });
                                                                                                                                                                                });
                                                                                                                                                                            });
                                                                                                                                                                        });
                                                                                                                                                                    });
                                                                                                                                                                });
                                                                                                                                                            });
                                                                                                                                                        });
                                                                                                                                                    });
                                                                                                                                                });
                                                                                                                                            });
                                                                                                                                        });
                                                                                                                                    });
                                                                                                                                    //FIM ESCRITAS

                                                                                                                                });


                                                                                                                        });


                                                                                                                });


                                                                                                        });


                                                                                                });


                                                                                        });


                                                                                });


                                                                        });



                                                                });



                                                        });


                                                });


                                        });

                                });

                        })





                }//Fecha success
            }); //Fecha ajax
        }); //Fecha ler query.json
    }) //Fecha ler arquivo
}


function login() {

    var usuario = $("input[name=usuario]").val();
    var senha = $("input[name=senha]").val();

    var apagar_jsons =0;

    escreverArquivo("sincronia.json", "", apagar_jsons,function() {
        escreverArquivo("spotcheck.json", "", apagar_jsons, function() {
            escreverArquivo("resposta.json", "", apagar_jsons, function() {
                escreverArquivo("query.json", "", apagar_jsons, function() {
                    escreverArquivo("obra.json", "",apagar_jsons, function() {
                        escreverArquivo("cliente.json", "", apagar_jsons, function() {
                            escreverArquivo("gerencia.json", "", apagar_jsons, function() {
                                escreverArquivo("responsavel.json", "", apagar_jsons, function() {
                                    escreverArquivo("setor.json", "", apagar_jsons, function() {
                                        escreverArquivo("frente.json", "", apagar_jsons, function() {
                                            escreverArquivo("localizacao.json", "", apagar_jsons, function() {
                                                escreverArquivo("atividade.json", "", apagar_jsons, function() {
                                                    escreverArquivo("tema_em_uso.json", "", apagar_jsons, function() {
                                                        escreverArquivo("pergunta_em_uso.json", "", apagar_jsons, function() {
                                                            escreverArquivo("programacao.json", "", apagar_jsons, function() {
                                                                escreverArquivo("programacao_temas.json", "", apagar_jsons, function() {
                                                                    escreverArquivo("terceiro.json", "", apagar_jsons, function() {
                                                                        escreverArquivo("usuario.json", "", apagar_jsons, function() {
                                                                            
                                                                            //Função LOGIN inicio                                                                            
                                                                            if(checkInternet()) {

                                                                                $.ajax({
                                                                                    url: url + 'php/login.php',
                                                                                    type: 'POST',
                                                                                    data: $("#form-login").serialize(),
                                                                                    beforeSend: function() {
                                                                                        myApp.showPreloader("Aguarde");
                                                                                    },
                                                                                    success: function(data) {
                                                                                        myApp.hidePreloader();
                                                                                        data = JSON.parse(data);

                                                                                        if(data.status) {
                                                                                            var retorno = JSON.parse(data.dados);

                                                                                            sessionStorage.setItem("user", data.dados);
                                                                                            localStorage.setItem("obra_id", retorno.id_obra);
                                                                                            localStorage.setItem("usuario_id", retorno.id);

                                                                                            //Inicia a Sincronia
                                                                                            var tabelas_sincronizar = "obra,gerencia,setor,atividade,frente,localizacao,tema_em_uso,pergunta,cliente,programacao,programacao_temas,terceiro,usuarios";
                                                                                            sincronizar(tabelas_sincronizar,retorno.id_obra,retorno.id)

                                                                                        } else {
                                                                                            myApp.alert("Os dados fornecidos estão incorretos.","Tente novamente");
                                                                                        }
                                                                                    },
                                                                                    error: function(xhr, status, error) {
                                                                                        myApp.hidePreloader();

                                                                                        //Verifica se há informações salvas
                                                                                        lerArquivo("usuario.json", function(data) {
                                                                                            var encontrou = false;

                                                                                            //alert("Usuários encontrados: "+JSON.stringify(data));
                                                                                            if (data.length > 0) {
                                                                                                for (var i = 0; i < data.length; i++) {
                                                                                                    var item = data[i];
                                                                                                    if (item["usuario"] == usuario && item["senha"] == md5(senha)) {
                                                                                                        //Encontrou o usuário na base interna
                                                                                                        encontrou = true;
                                                                                                        i = data.length;

                                                                                                        sessionStorage.setItem("user", JSON.stringify(item));
                                                                                                        localStorage.setItem("obra_id", item["id_obra"]);
                                                                                                        localStorage.setItem("usuario_id", item["id"]);
                                                                                                        mainView.router.loadPage({
                                                                                                            url: 'programacao-atual.html',
                                                                                                            animatePages: false
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            }

                                                                                            if (!encontrou) {
                                                                                                myApp.alert("Você não possui uma conexão à internet. É necessário conectar-se para realizar a sincronia dos dados.","Sem conexão!");
                                                                                            }

                                                                                        });

                                                                                    }
                                                                                });

                                                                            } else {
                                                                                myApp.hidePreloader();

                                                                                //Verifica se há informações salvas
                                                                                lerArquivo("usuario.json", function(data) {
                                                                                    var encontrou = false;

                                                                                    //alert("Usuários encontrados: "+JSON.stringify(data));
                                                                                    if (data.length > 0) {
                                                                                        for (var i = 0; i < data.length; i++) {
                                                                                            var item = data[i];
                                                                                            if (item["usuario"] == usuario && item["senha"] == md5(senha)) {
                                                                                                //Encontrou o usuário na base interna
                                                                                                encontrou = true;
                                                                                                i = data.length;

                                                                                                //alert("offliner"+JSON.stringify(item));
                                                                                                sessionStorage.setItem("user", JSON.stringify(item));
                                                                                                localStorage.setItem("obra_id", item["id_obra"]);
                                                                                                localStorage.setItem("usuario_id", item["id"]);
                                                                                                mainView.router.loadPage({
                                                                                                    url: 'programacao-atual.html',
                                                                                                    animatePages: false
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                    if (!encontrou) {
                                                                                        myApp.alert("Você não possui uma conexão à internet. É necessário conectar-se para realizar a sincronia dos dados.","Sem conexão!");
                                                                                    }

                                                                                });
                                                                            }
                                                                            //Função LOGIN Fim


                                                                        }); //Fim usuários
                                                                    }); //Fim terceiros                                                       
                                                                }); //Fim programacao temas                                                
                                                            }); //Fim programacao
                                                        }); //Fim pergunta
                                                    }); //Fim tema                                      
                                                }); //Fim atividade
                                            }); //Fim localizacao
                                        }); //Fim frente
                                    }); //Fim setor
                                }); //Fim responsavel
                            }); //Fim gerencia
                        }); //Fim cliente
                    }); //Fim obra
                }); //Queries que serão executadas assim que houver conexão
            }); //Fim resposta
        }); //Fim spotcheck
    }); //Fim escrever
    
}

function apagar_tudo() {
    apagar_jsons = 1;
    escreverArquivo("sincronia.json", "", apagar_jsons,function() {
        escreverArquivo("spotcheck.json", "", apagar_jsons, function() {
            escreverArquivo("resposta.json", "", apagar_jsons, function() {
                escreverArquivo("query.json", "", apagar_jsons, function() {
                    escreverArquivo("obra.json", "",apagar_jsons, function() {
                        escreverArquivo("cliente.json", "", apagar_jsons, function() {
                            escreverArquivo("gerencia.json", "", apagar_jsons, function() {
                                escreverArquivo("responsavel.json", "", apagar_jsons, function() {
                                    escreverArquivo("setor.json", "", apagar_jsons, function() {
                                        escreverArquivo("frente.json", "", apagar_jsons, function() {
                                            escreverArquivo("localizacao.json", "", apagar_jsons, function() {
                                                escreverArquivo("atividade.json", "", apagar_jsons, function() {
                                                    escreverArquivo("tema_em_uso.json", "", apagar_jsons, function() {
                                                        escreverArquivo("pergunta_em_uso.json", "", apagar_jsons, function() {
                                                            escreverArquivo("programacao.json", "", apagar_jsons, function() {
                                                                escreverArquivo("programacao_temas.json", "", apagar_jsons, function() {
                                                                    escreverArquivo("terceiro.json", "", apagar_jsons, function() {
                                                                        escreverArquivo("usuario.json", "", apagar_jsons, function() {
                                                                            alert("Todos os arquivos apagados.");

                                                                        });
                                                                    });                                                                    
                                                                });                                                                
                                                            });
                                                        });
                                                    });                                                    
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }); //Queries que serão executadas assim que houver conexão
            });     
        });
    }); //Fim escrever
}







function colorirDisabled() {

    $("select").each(function() {

        if ($(this).attr("disabled") == "disabled") {
            $(this).parent().css("background", "#EEE");
        } else {
            $(this).parent().css("background", "#FFF");
        }
    });
}



//obj_guardar = {
//pergunta : ""
//};


	//function voltar_pergunta_func(){
		
		//alert('testando' + obj_guardar.pergunta);
		
	/*
	lerArquivo("pergunta_em_uso.json", function(pergunta2) {
											  
			 voltar_pergunta = 1;
	 alert('teste: vlprg:' + voltar_pergunta );
	 proxima_pergunta(pergunta2);
	 
		});
	
	*/
	
	//voltar_pergunta = 1;
	//proxima_pergunta( obj_guardar.pergunta );
	
	//}
	



function proxima_pergunta(pergunta) {
	
	
//obj_guardar['pergunta'] = pergunta ;
	

	//alert('pergunta:' + pergunta);
	//alert('resposta length:' + resposta.length);
	//alert('pergunta length:' + pergunta.length);
	
    var id_spotcheck = localStorage.getItem('spotcheck_id');

    //Verifica as respostas salvas para saber qual a próxima
    lerArquivo("resposta.json", function(resposta) {
        for (var i = 0; i < pergunta.length; i++) {
			//alert('so i:' + i);
			
            for (var j = 0; j < resposta.length; j++) {
				
				//if( j < 5 || ( j > 50 && j < 55 ) ){
				//alert('so j:' + j);
				//}
				
				/*
                if (id_spotcheck == resposta[j].id_spotcheck && pergunta[i].id == resposta[j].id_pergunta) {
                    //Retira as perguntas que já foram respondidas
					////////////if( voltar_pergunta == 0){
                    pergunta.splice(i, 1);
					////////////} else {
                    ////////////pergunta.splice(i - 1, 1);
					////////////////voltar_pergunta = 0;
					/////////////////}
					
					//alert('i:' + i + ', j:' +  j);
                }*/
				
				
					if( voltar_pergunta == 0){						
						
						if (id_spotcheck == resposta[j].id_spotcheck && pergunta[i].id == resposta[j].id_pergunta) {   
						pergunta.splice(i, 1);
						}
          
					} else {
						
						//voltar_pergunta = 0;
						
						if (id_spotcheck == resposta[j].id_spotcheck && pergunta[i].id == resposta[j].id_pergunta) {    
						pergunta.splice(i - 2, 3);
						}
					
					}
				
				
            }
        }

        var total = $(".total_perguntas").text();
        //$(".pergunta_atual").text((total - pergunta.length) + 1);
		
		
				
					if( voltar_pergunta == 0){						
						
			$(".pergunta_atual").text((total - pergunta.length) + 1);
          
					} else {
						
		$(".pergunta_atual").text((total - pergunta.length) - 1);
					
					}

        if (pergunta.length == 0) {//t1
            //myApp.showPreloader("Aguarde");
            //Acabou o questionário

            //pega as respostas do spotcheck
            getManyById(id_spotcheck, "id_spotcheck", "resposta.json", function(itens) {
                //Calcula porcentagem
                var total_respostas = itens.length;

                var qtd_respostas_sim = 0;
                var pesos = 0;
                var resultado = 0;

                if (total_respostas > 0) {
                    var total_pesos = 0;
                    for (var i = 0; i < total_respostas; i++) {
                        total_pesos += Number(itens[i].peso);
                    }

                    for (var i = 0; i < total_respostas; i++) {
                        if (itens[i].resposta == "sim") {
                            if (itens[i].peso != 0) {
                                resultado += itens[i].peso / total_pesos;
                            }
                        }
                    }
                } else {
                    resultado = 1;
                }

                var qtd_respostas_nao = total_respostas - qtd_respostas_sim;

                if (total_respostas == 0) {
                    var porcentagem = 100;
                } else {
                    var porcentagem = qtd_respostas_sim * 100 / total_respostas;
                }

                var html = '';
                html += '<div class="list-block nomargin-vertical">';
                html += '<div class="card-header"><strong>Porcentagem de conformidades</strong></div>';
                html += '<div class="porcentagem">';
                html += Math.round(resultado * 100) + '<span>%</span>';
                html += '</div>';
                html += '</div>';

                //Coloca o spotcheck como finalizado
                mudaAtributo("id", id_spotcheck, "finalizado", "1", "spotcheck.json", function() {
                    $(".resultado").html(html);
                    $(".resultado").fadeIn();
                    myApp.hidePreloader();

                    $(".page").append('<div class="toolbar btn-iniciar btn-voltar-spotchecks"><a href="#" class="button button-fill button-big button-raised">Voltar para Spotchecks</a></div>');
                    $(".btn-voltar-spotchecks").off().click(function() {
                        mainView.router.loadPage('selecionar-spotcheck.html');
                        $(this).remove();
                    });
                });

            });

           
		   
		   
		   
		   
		   
		   


        } else {//t1


		//var pergunta_atual_teste = localStorage.getItem("pergunta_atual"); 
		//var pergunta_id_teste = localStorage.getItem("pergunta_id"); 
		//alert( 'perg_at:' + pergunta_atual_teste + ', pergid_at:' + pergunta_id_teste );
   
		
            //Pega proxima pergunta
            $(".resposta-sim").removeAttr("checked");

            id_pergunta = pergunta[0].id;
            $(".pergunta").html(pergunta[0].pergunta);
            $(".pergunta").attr("data-id", id_pergunta);
			
			//alert( 'id_pergunta:' + id_pergunta + ', pergunta0.pergunta:' + pergunta[0].pergunta );

            myApp.hidePreloader();
            $(".resultado").fadeIn();


            localStorage.setItem("pergunta_id", id_pergunta);
            localStorage.setItem("pergunta_atual", pergunta[0].pergunta);
            localStorage.setItem("pergunta_atual_peso", pergunta[0].peso);
			
			

		//var pergunta_id_teste = localStorage.getItem("pergunta_id"); 
		//alert( 'perg_at:' + pergunta_atual_teste + ', pergid_at:' + pergunta_id_teste );

            $(".resposta-sim").off().click(function() {
                myApp.popover('.pop-sim');
            });

            $(".resposta-naoaplica").off().click(function() {
                myApp.closeModal('.pop-sim');
                //Escreve no arquivo
                var pergunta_atual = localStorage.getItem("pergunta_atual");
                var pergunta_atual_peso = 0;
                var data_atual = new Date();
                var mes = data_atual.getMonth() + 1;
                if (mes > 12) {
                    mes = 1;
                }
                data_atual = data_atual.getFullYear() + "-" + zero_esq(mes) + "-" + zero_esq(data_atual.getDate()) + " " + zero_esq(data_atual.getHours()) + ":" + zero_esq(data_atual.getMinutes()) + ":" + zero_esq(data_atual.getSeconds());

                var resp = {
                    resposta: "nao-aplica",
                    id_spotcheck: id_spotcheck,
                    id_pergunta: id_pergunta,
                    data_atual: data_atual,
                    pergunta: pergunta_atual,
                    peso: pergunta_atual_peso
                }

                escreverArquivo("resposta.json", JSON.stringify(resp) + ",", 0, function() {
                    $(".resultado").fadeOut(function() {
                        proxima_pergunta(pergunta);
                    });
                });
            });
			
			
			$(".bt_voltar_new_pergunta").off().click(function() {
															  
			 voltar_pergunta = 1;

                    $(".resultado").fadeOut(function() {
                        proxima_pergunta(pergunta);
                    });
              
            });
			

            $(".sim-foto").off().click(function() {
                myApp.closeModal('.pop-sim');
                mainView.router.loadPage('registra-sim.html');
            });

            $(".sim-prossegue").off().click(function() {
                myApp.closeModal('.pop-sim');
                //Escreve no arquivo
                var pergunta_atual = localStorage.getItem("pergunta_atual");
                var pergunta_atual_peso = localStorage.getItem("pergunta_atual_peso");
                var data_atual = new Date();
                var mes = data_atual.getMonth() + 1;
                if (mes > 12) {
                    mes = 1;
                }
                data_atual = data_atual.getFullYear() + "-" + zero_esq(mes) + "-" + zero_esq(data_atual.getDate()) + " " + zero_esq(data_atual.getHours()) + ":" + zero_esq(data_atual.getMinutes()) + ":" + zero_esq(data_atual.getSeconds());

                var resp = {
                    resposta: "sim",
                    id_spotcheck: id_spotcheck,
                    id_pergunta: id_pergunta,
                    data_atual: data_atual,
                    pergunta: pergunta_atual,
                    peso: pergunta_atual_peso
                }

                escreverArquivo("resposta.json", JSON.stringify(resp) + ",", 0, function() {
                    $(".resultado").fadeOut(function() {
                        proxima_pergunta(pergunta);
                    });
                });
            });

            $(".resposta-nao").off().click(function() {
                //myApp.closeModal('.ti-acao');
                myApp.popover('.pop-acao');
            });

            $(".acao-registrar").off().click(function() {

                var data_atual = new Date();
                var pergunta_atual = localStorage.getItem("pergunta_atual");
                var pergunta_atual_peso = localStorage.getItem("pergunta_atual_peso");
                var mes = data_atual.getMonth() + 1;
                if (mes > 12) {
                    mes = 1;
                }
                data_atual = data_atual.getFullYear() + "-" + zero_esq(mes) + "-" + zero_esq(data_atual.getDate()) + " " + zero_esq(data_atual.getHours()) + ":" + zero_esq(data_atual.getMinutes()) + ":" + zero_esq(data_atual.getSeconds());

                //Escreve no arquivo
                var resp = {
                    resposta: "registrar",
                    id_spotcheck: id_spotcheck,
                    id_pergunta: id_pergunta,
                    data_atual: data_atual,
                    pergunta: pergunta_atual,
                    peso: pergunta_atual_peso
                }

                escreverArquivo("resposta.json", JSON.stringify(resp) + ",", 0, function() {
                    $(".resultado").fadeOut(function() {
                        proxima_pergunta(pergunta);
                    });
                });

                myApp.closeModal('.pop-acao');

            });

            $(".acao-solucao").off().click(function() {
                myApp.closeModal('.pop-acao');
                mainView.router.loadPage('registra-solucao.html');
            });

            $(".acao-tn").off().click(function() {
                myApp.closeModal('.pop-acao');
                mainView.router.loadPage('registra-tn.html');
            });

            $(".acao-rd").off().click(function() {
                myApp.closeModal('.pop-acao');
                mainView.router.loadPage('registra-rd.html');
            });
        }
    });
	
	
	
}//t1







// Generate dynamic page
var dynamicPageIndex = 0;

function createContentPage() {
    mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
    return;
}

function formata_data(v) {
    var dt = v.split(" ");
    var pt1 = dt[0].split("-");
    return pt1[2] + "/" + pt1[1] + "/" + pt1[0] + " " + dt[1]
}

function zero_esq(v) {
    if (v < 10) {
        return "0" + v;
    } else {
        return v;
    }
}

function getById(id, campo, dados, callback) {

    lerArquivo(dados, function(data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item[campo] == id) {
                callback(item);
            }
        }
    });

}

function getManyById(id, campo, dados, callback) {

    lerArquivo(dados, function(data) {
        var result = "";
        var item = "";
        for (var i = 0; i < data.length; i++) {
            item = JSON.stringify(data[i]);
            if (data[i][campo] == id) {
                if (typeof item != "undefined") {
                    result += item + ",";
                }
            }
        }
        result = JSON.parse("[" + result.slice(0, -1) + "]");
        callback(result);
    });
}

function getManyById_2(id, campo, id2, campo2, dados, callback) {

    lerArquivo(dados, function(data) {
        var result = "";
        var item = "";
        for (var i = 0; i < data.length; i++) {
            item = JSON.stringify(data[i]);
            if (data[i][campo] == id && data[i][campo2] == id2) {
                if (typeof item != "undefined") {
                    result += item + ",";
                }
            }
        }
        result = JSON.parse("[" + result.slice(0, -1) + "]");
        callback(result);
    });
}

function getManyById_2_like(id, campo, id2, campo2, dados, callback) {

    lerArquivo(dados, function(data) {
        var result = "";
        var item = "";
        for (var i = 0; i < data.length; i++) {
            item = JSON.stringify(data[i]);
            if (data[i][campo] == id && id2.indexOf(data[i][campo2]) != -1) {
                if (typeof item != "undefined") {
                    result += item + ",";
                }
            }
        }
        result = JSON.parse("[" + result.slice(0, -1) + "]");
        callback(result);
    });
}

function mudaAtributo(campo_onde, valor_onde, campo_alterar, valor_alterar, dados, callback) {
    lerArquivo(dados, function(data) {
        var result = "";
        var item = "";
        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            if (item[campo_onde] == valor_onde) {
                item[campo_alterar] = valor_alterar;
            }

            item = JSON.stringify(item);
            result += item + ",";

        }

        escreverArquivo(dados, result, 1, function() {
            callback();
        });
    });
}

function mudaBotaoSpotcheck(tipo) {

    if (tipo == "btn-criar-spotcheck") {
        $("#btn-acao").show();
        $("#btn-acao a").html("Criar novo Spotcheck").parent().removeClass("btn-enviar-spotcheck").addClass("btn-criar-spotcheck");

        $(".btn-criar-spotcheck a").off().click(function() {
            localStorage.removeItem("spotcheck_id");
            mainView.router.loadPage('spotcheck-inicio.html');
        });
    }

    if (tipo == "btn-prosseguir-sem-programacao") {
        $("#btn-acao-prog").show();
        $("#btn-acao-prog a").html("Prosseguir sem Programação").parent().removeClass("btn-enviar-spotcheck").addClass("btn-prosseguir-sem-programacao");

        $(".btn-prosseguir-sem-programacao a").off().click(function() {
            localStorage.setItem("programacao_id", 0);
            localStorage.setItem("programacao_nome", "Sem programação");
            mainView.router.loadPage('selecionar-spotcheck.html');
        });
    }

    if (tipo == "btn-programacao") {
        if ($("#status-subprogramacoes").val() == "concluido") {
            var total_para_enviar = $(".lista-spotchecks-para-enviar li").length;
            $("#btn-acao").show();
            $("#btn-acao a").html("Concluir Tarefas").parent().removeClass("btn-enviar-spotcheck").addClass("btn-concluir-tarefas");

            $(".btn-concluir-tarefas a").off().click(function() {
                if (total_para_enviar > 0) {
                    myApp.alert("Total a ser enviado: " + total_para_enviar, "Envie todos os Spotchecks para Concluir");
                } else {

                    var programacao_id = localStorage.getItem("programacao_id");
                    var query = "{\"query\":\"UPDATE programacao SET completado = 1 WHERE id = '"+programacao_id+"';\"}";

                    escreverArquivo("query.json", query + ",", 0, function() {
                        mudaAtributo("id", programacao_id, "completado", "1", "programacao.json", function() {
                            mainView.router.loadPage('programacao-atual.html');
                        })
                    });

                    /*
                    $.ajax({
                        url: url + 'php/setProgramacaoCompletado.php',
                        type: 'POST',
                        data: {
                            programacao_id: programacao_id
                        }
                    }).done(function(data) {
                        mainView.router.loadPage('programacao-atual.html');
                    });
                    */

                }
            });

        } else {
            $("#btn-acao").hide();
        }
    }

    if (tipo == "btn-enviar-spotcheck") {
        $("#btn-acao").show();
        $("#btn-acao a").html("Enviar Spotchecks selecionados").parent().removeClass("btn-criar-spotcheck").addClass("btn-enviar-spotcheck");

        $(".btn-enviar-spotcheck a").off().click(function() {

            var spotcheck_ids = "";

            if ($("input[name=id-spotcheck-envio]:checked").length > 0) {
                $("input[name=id-spotcheck-envio]:checked").each(function() {
                    spotcheck_ids += $(this).val() + ",";
                });

                if (spotcheck_ids != "") {
                    spotcheck_ids = spotcheck_ids.slice(0, -1);
                }

                localStorage.setItem('spotchecks_selecionados', spotcheck_ids.toString());

                mainView.router.loadPage('enviando-spotcheck.html');
            } else {
                myApp.alert("Marque um Spotcheck para enviar.", "Atenção");
            }

        });
    }
}


function enviarSpotchecks(spotcheck_ids) {
    var user = JSON.parse("[" + sessionStorage.getItem("user") + "]");
    var id_tecnico = user[0].id;

    if (typeof spotcheck_ids == "string") {
        spotcheck_ids = spotcheck_ids.split(',');
    }

    if (spotcheck_ids) {
        //spotcheck_ids = spotcheck_ids.split(",");
        getById(spotcheck_ids[0], "id", "spotcheck.json", function(item) {
            var item_string = JSON.stringify(item);

            $("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id=" + spotcheck_ids[0] + "]").find(".item-after").html("Enviando...");

            //pega as respostas do spotcheck
            getManyById(spotcheck_ids[0], "id_spotcheck", "resposta.json", function(respostas) {

                //CONTA QUANTAS FOTOS TEM PARA UPLOAD
                var fotos_para_upload = "";
                var fotos_enviadas = 0;
                var fotos_nomes = [];
                var fotos_por_nome = "";
                for (i = 0; i < respostas.length; i++) {
                    var resposta = respostas[i];
                    data_atual = resposta.data_atual;
                    data_atual = data_atual.replace(/-/g, "_");
                    data_atual = data_atual.replace(/:/g, "_");
                    data_atual = data_atual.replace(/\ /g, "_");

                    if (resposta.foto1) {
                        fotos_para_upload += resposta.foto1 + ",";
                        var n = "foto1_" + id_tecnico + "_" + data_atual + "_" + Math.floor(Math.random() * 999);
                        fotos_nomes.push(n);
                        fotos_por_nome += n;
                    }
                    fotos_por_nome += "|";

                    if (resposta.foto2) {
                        fotos_para_upload += resposta.foto2 + ",";
                        var n = "foto2_" + id_tecnico + "_" + data_atual + "_" + Math.floor(Math.random() * 999);
                        fotos_nomes.push(n);
                        fotos_por_nome += n;
                    }
                    fotos_por_nome += "|";

                    if (resposta.foto3) {
                        fotos_para_upload += resposta.foto3 + ",";
                        var n = "foto3_" + id_tecnico + "_" + data_atual + "_" + Math.floor(Math.random() * 999);
                        fotos_nomes.push(n);
                        fotos_por_nome += n;
                    }
                    fotos_por_nome += "|";

                    if (fotos_por_nome != "") {
                        fotos_por_nome = fotos_por_nome.slice(0, -1);
                    }
                    fotos_por_nome += "&";
                }

                if (fotos_por_nome != "") {
                    fotos_por_nome = fotos_por_nome.slice(0, -1);
                }

                if (fotos_para_upload != "") {
                    fotos_para_upload = fotos_para_upload.slice(0, -1);
                }
                fotos_para_upload = fotos_para_upload.split(",");
                //alert(fotos_para_upload);

                //REALIZA O UPLOAD
                if ($.trim(fotos_para_upload) != "") {
                    for (j = 0; j < fotos_para_upload.length; j++) {

                        /* UPLOAD DE IMAGENS */
                        var fileURL = fotos_para_upload[j];

                        var options = new FileUploadOptions();
                        options.fileKey = "file";
                        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                        options.mimeType = "image/jpeg";
                        options.chunkedMode = true;

                        var params = {};
                        params.nome_arq = fotos_nomes[j];

                        options.params = params;

                        var ft = new FileTransfer();
                        ft.upload(fileURL, encodeURI(url + "php/upload.php"), win, fail, options);
                    }
                } else {
                    //Não tem fotos

                    lerArquivo("query.json", function(queries) {
                        queries = JSON.stringify(queries);
                        //Envia o spotcheck sem fotos
                        respostas_string = JSON.stringify(respostas);
                        $.ajax({
                            url: url + 'php/enviarSpotcheck.php',
                            type: 'POST',
                            timeout: 0,
                            data: {
                                id_spotcheck_local: spotcheck_ids[0],
                                spotcheck: item_string,
                                respostas: respostas_string,
                                queries: queries
                            },
                            success: function(data) {
                                //alert("Sem fotos"+data);
                                //Apaga Queries, pois já foram inseridas na sincronia
                                escreverArquivo("query.json", "", 1); //Queries que serão executadas assim que houver conexão
								id_spotcheck_local = data;
                                if (data != "erro") {

                                    data = data.split("|");
                                    var id_spotcheck_local = data[0];
                                    var id_spotcheck_remoto = data[1];

                                    $("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id=" + id_spotcheck_local + "]").find(".item-after").html("Enviando e-mails...");
									
									
 //myApp.alert( "id_spotcheck_local: " + id_spotcheck_local + ", id_spotcheck_remoto: "+id_spotcheck_remoto, "Teste1.");

									
                                    //Gera os relatórios e envia os e-mails
                                    $.ajax({
                                        url: url + 'php/enviarEmailsSpotcheck.php',
                                        type: 'POST',
                                        timeout: 0,
                                        data: {
                                            id_spotcheck_local: id_spotcheck_local,
                                            id_spotcheck_remoto: id_spotcheck_remoto
                                        },
                                        success: function(data) {
                                            data = data.split("|");
                                            id_spotcheck_local = data[0];
                                            id_spotcheck_remoto = data[1];
                                            
                                            //Muda entregue para 1
                                            mudaAtributo("id", id_spotcheck_local, "entregue", "1", "spotcheck.json", function() {
                                                $("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id=" + id_spotcheck_local + "]").find(".item-after").html("OK!");
                                                $("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id=" + id_spotcheck_local + "]").find(".item-media i").removeClass("mdi-cloud-outline-off").addClass("mdi-cloud-check").css("color", "green");

                                                spotcheck_ids.shift();

                                                if (spotcheck_ids != "") {
                                                    enviarSpotchecks(spotcheck_ids.toString());
                                                } else {
                                                    //Enviou todos
                                                    $("#enviando-spotcheck").append('<div class="toolbar btn-iniciar btn-voltar-spotchecks"><a href="#" class="button button-fill button-big button-raised">Voltar para Spotchecks</a></div>');
                                                    $("#enviando-spotcheck .btn-voltar-spotchecks").off().click(function() {
                                                        mainView.router.loadPage({
                                                            url: 'selecionar-spotcheck.html',
                                                            animatePages: false
                                                        });
                                                        $(this).remove();
                                                    });
                                                }

                                            });

                                        },
                                        error: function(x, status) {
                                            var error_msg = "";
                                            if (x.status==0) {
                                                error_msg = "Erro de conexão.";
                                            } else if(x.status==404) {
                                                error_msg = "Página não encontrada.";
                                            } else if(x.status==500) {
                                                error_msg = "Erro interno de servidor.";
                                            } else if(e=='parsererror') {
                                                error_msg = "Erro de parsing.";
                                            } else if(e=='timeout'){
                                                error_msg = "Erro de Timeout.";
                                            } else {
                                                error_msg = "Erro desconhecido "+x.responseText+".";
                                            }

                                            myApp.alert("Erro 04-A: Não foi possível realizar o envio de E-mails. "+error_msg, "O servidor de mensagens está ocupado.");

                                            $("#enviando-spotcheck .lista-spotchecks-enviando a").each(function() {
                                                if ($(this).find(".item-after").text() == "Enviando...") {
                                                    $(this).find(".item-after").text('E-mail falhou!');
                                                }
                                            });
                                            //$("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id="+id_spotcheck_local+"]").find(".item-after").html("Erro!");

                                            $("#enviando-spotcheck").append('<div class="toolbar btn-iniciar btn-voltar-spotchecks"><a href="#" class="button button-fill button-big button-raised">Voltar para Spotchecks</a></div>');
                                            $("#enviando-spotcheck .btn-voltar-spotchecks").off().click(function() {
                                                mainView.router.loadPage({
                                                    url: 'selecionar-spotcheck.html',
                                                    animatePages: false
                                                });
                                                $(this).remove();
                                            });
                                        }
                                    });
                                } else {
                                    myApp.alert("Erro 01: Não foi possível realizar o envio do Spotcheck. Não foi identificada uma conexão com a internet.", "Sem conexão à internet!");

                                    $("#enviando-spotcheck .lista-spotchecks-enviando a").each(function() {
                                        if ($(this).find(".item-after").text() == "Enviando...") {
                                            $(this).find(".item-after").text('Sem conexão!');
                                        }
                                    });
                                    //$("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id="+id_spotcheck_local+"]").find(".item-after").html("Erro!");

                                    $("#enviando-spotcheck").append('<div class="toolbar btn-iniciar btn-voltar-spotchecks"><a href="#" class="button button-fill button-big button-raised">Voltar para Spotchecks</a></div>');
                                    $("#enviando-spotcheck .btn-voltar-spotchecks").off().click(function() {
                                        mainView.router.loadPage({
                                            url: 'selecionar-spotcheck.html',
                                            animatePages: false
                                        });
                                        $(this).remove();
                                    });
                                }
                            },
                            error: function(x,e) {
                                var error_msg = "";
                                if (x.status==0) {
                                    error_msg = "Erro de conexão.";
                                } else if(x.status==404) {
                                    error_msg = "Página não encontrada.";
                                } else if(x.status==500) {
                                    error_msg = "Erro interno de servidor.";
                                } else if(e=='parsererror') {
                                    error_msg = "Erro de parsing.";
                                } else if(e=='timeout'){
                                    error_msg = "Erro de Timeout.";
                                } else {
                                    error_msg = "Erro desconhecido "+x.responseText+".";
                                }

                                myApp.alert("Erro 02: Não foi possível realizar o envio do Spotcheck. Não foi identificada uma conexão com a internet. "+error_msg, "Sem conexão à internet!");

                                $("#enviando-spotcheck .lista-spotchecks-enviando a").each(function() {
                                    if ($(this).find(".item-after").text() == "Enviando...") {
                                        $(this).find(".item-after").text('Sem conexão!');
                                    }
                                });
                                //$("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id="+id_spotcheck_local+"]").find(".item-after").html("Erro!");

                                $("#enviando-spotcheck").append('<div class="toolbar btn-iniciar btn-voltar-spotchecks"><a href="#" class="button button-fill button-big button-raised">Voltar para Spotchecks</a></div>');
                                $("#enviando-spotcheck .btn-voltar-spotchecks").off().click(function() {
                                    mainView.router.loadPage({
                                        url: 'selecionar-spotcheck.html',
                                        animatePages: false
                                    });
                                    $(this).remove();
                                });
                            }
                        });
                    });
                }

                function win(r) {
                    fotos_enviadas++;

                    //Todas as fotos enviadas
                    if (fotos_enviadas == fotos_para_upload.length) {

                        //Modifica os links das fotos nas respostas
                        respostas_modificadas = respostas;
                        var j = 0;
                        fotos_por_nome = fotos_por_nome.split("&")
                        for (i = 0; i < respostas_modificadas.length; i++) {

                            var fts = fotos_por_nome[i].split("|");

                            if (respostas_modificadas[i].foto1) {
                                respostas_modificadas[i].foto1 = fts[0] + ".jpg";
                            }
                            if (respostas_modificadas[i].foto2) {
                                respostas_modificadas[i].foto2 = fts[1] + ".jpg";
                            }
                            if (respostas_modificadas[i].foto3) {
                                respostas_modificadas[i].foto3 = fts[2] + ".jpg";
                            }
                        }


                        respostas_string = JSON.stringify(respostas_modificadas);


                        lerArquivo("query.json", function(queries) {
                            queries = JSON.stringify(queries);
                            //Envia o spotcheck
                            $.ajax({
                                url: url + 'php/enviarSpotcheck.php',
                                timeout: 0,
                                type: 'POST',
                                data: {
                                    id_spotcheck_local: spotcheck_ids[0],
                                    spotcheck: item_string,
                                    respostas: respostas_string,
                                    queries: queries
                                },
                                success: function(data) {
                                    //alert(data);
                                    //Apaga Queries, pois já foram inseridas na sincronia
                                    escreverArquivo("query.json", "", 1); //Queries que serão executadas assim que houver conexão

                                    id_spotcheck_local = data;
                                    if (data != "erro") {

                                        data = data.split("|");
                                        var id_spotcheck_local = data[0];
                                        var id_spotcheck_remoto = data[1];

                                        $("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id=" + id_spotcheck_local + "]").find(".item-after").html("Enviando e-mails...");
										
										
										
                                        //Gera os relatórios e envia os e-mails
                                        $.ajax({
                                            url: url + 'php/enviarEmailsSpotcheck.php',
                                            type: 'POST',
                                            timeout: 0,
                                            data: {
                                                id_spotcheck_local: id_spotcheck_local,
                                                id_spotcheck_remoto: id_spotcheck_remoto
                                            },
                                            success: function(data) {
                                                data = data.split("|");
                                                id_spotcheck_local = data[0];
                                                id_spotcheck_remoto = data[1];

                                                //Muda entregue para 1
                                                mudaAtributo("id", id_spotcheck_local, "entregue", "1", "spotcheck.json", function() {
                                                    $("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id=" + id_spotcheck_local + "]").find(".item-after").html("OK!");
                                                    $("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id=" + id_spotcheck_local + "]").find(".item-media i").removeClass("mdi-cloud-outline-off").addClass("mdi-cloud-check").css("color", "green");

                                                    spotcheck_ids.shift();

                                                    if (spotcheck_ids != "") {
                                                        enviarSpotchecks(spotcheck_ids.toString());
                                                    } else {
                                                        //Enviou todos
                                                        $("#enviando-spotcheck").append('<div class="toolbar btn-iniciar btn-voltar-spotchecks"><a href="#" class="button button-fill button-big button-raised">Voltar para Spotchecks</a></div>');
                                                        $("#enviando-spotcheck .btn-voltar-spotchecks").off().click(function() {
                                                            mainView.router.loadPage({
                                                                url: 'selecionar-spotcheck.html',
                                                                animatePages: false
                                                            });
                                                            $(this).remove();
                                                        });
                                                    }

                                                });

                                            },
                                            error: function(x, status) {
                                                var error_msg = "";
                                                if (x.status==0) {
                                                    error_msg = "Erro de conexão.";
                                                } else if(x.status==404) {
                                                    error_msg = "Página não encontrada.";
                                                } else if(x.status==500) {
                                                    error_msg = "Erro interno de servidor.";
                                                } else if(e=='parsererror') {
                                                    error_msg = "Erro de parsing.";
                                                } else if(e=='timeout'){
                                                    error_msg = "Erro de Timeout.";
                                                } else {
                                                    error_msg = "Erro desconhecido "+x.responseText+".";
                                                }

                                                myApp.alert("Erro 04-B: Não foi possível realizar o envio de E-mails. "+error_msg, "O servidor de mensagens está ocupado.");

                                                $("#enviando-spotcheck .lista-spotchecks-enviando a").each(function() {
                                                    if ($(this).find(".item-after").text() == "Enviando...") {
                                                        $(this).find(".item-after").text('E-mail falhou!');
                                                    }
                                                });
                                                //$("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id="+id_spotcheck_local+"]").find(".item-after").html("Erro!");

                                                $("#enviando-spotcheck").append('<div class="toolbar btn-iniciar btn-voltar-spotchecks"><a href="#" class="button button-fill button-big button-raised">Voltar para Spotchecks</a></div>');
                                                $("#enviando-spotcheck .btn-voltar-spotchecks").off().click(function() {
                                                    mainView.router.loadPage({
                                                        url: 'selecionar-spotcheck.html',
                                                        animatePages: false
                                                    });
                                                    $(this).remove();
                                                });
                                            }
                                        });

                                    } else {
                                        myApp.alert("Erro 05: Não foi possível realizar o envio do Spotcheck. Por favor, tente novamente mais tarde.", "Erro ao enviar!");

                                        $("#enviando-spotcheck .lista-spotchecks-enviando a").each(function() {
                                            if ($(this).find(".item-after").text() == "Enviando...") {
                                                $(this).find(".item-after").text('Erro!');
                                            }
                                        });
                                        //$("#enviando-spotcheck .lista-spotchecks-enviando li a[data-id="+id_spotcheck_local+"]").find(".item-after").html("Erro!");

                                        $("#enviando-spotcheck").append('<div class="toolbar btn-iniciar btn-voltar-spotchecks"><a href="#" class="button button-fill button-big button-raised">Voltar para Spotchecks</a></div>');
                                        $("#enviando-spotcheck .btn-voltar-spotchecks").off().click(function() {
                                            mainView.router.loadPage({
                                                url: 'selecionar-spotcheck.html',
                                                animatePages: false
                                            });
                                            $(this).remove();
                                        });
                                    }
                                },
                                error: function(x, e) {
                                    var error_msg = "";
                                    if (x.status==0) {
                                        error_msg = "Erro de conexão.";
                                    } else if(x.status==404) {
                                        error_msg = "Página não encontrada.";
                                    } else if(x.status==500) {
                                        error_msg = "Erro interno de servidor.";
                                    } else if(e=='parsererror') {
                                        error_msg = "Erro de parsing.";
                                    } else if(e=='timeout'){
                                        error_msg = "Erro de Timeout.";
                                    } else {
                                        error_msg = "Erro desconhecido "+x.responseText+".";
                                    }

                                    myApp.alert("Erro 03: Não foi possível realizar o envio do Spotcheck. Não foi identificada uma conexão com a internet. "+error_msg, "Erro ao enviar!");
                                    $("#enviando-spotcheck").append('<div class="toolbar btn-iniciar btn-voltar-spotchecks"><a href="#" class="button button-fill button-big button-raised">Voltar para Spotchecks</a></div>');
                                    $("#enviando-spotcheck .btn-voltar-spotchecks").off().click(function() {
                                        mainView.router.loadPage({
                                            url: 'selecionar-spotcheck.html',
                                            animatePages: false
                                        });
                                        $(this).remove();
                                    });
                                }
                            });
                        });//Fim ler query
                    }
                }

                function fail(r) {
                    //alert(r);
                }


            });

        });
    }
}

function verifica_login() {
    if (sessionStorage.getItem("user") == null) {
        mainView.router.loadPage('login.html');
    }
}

function fecharPicker() {
    $(".picker-modal-inner").click(function() {
        //myApp.closeModal(".modal-picker");
    });
}

function updateSincronia(jsonInterno,jsonExterno) {
    var total_interno = jsonInterno.length;
    var total_externo = jsonExterno.length;

    //alert("qts tem:"+total_interno+" Qts vao entrar:"+total_externo);
    if(total_externo > 0) {

        for(var i = 0; i < total_interno; i++) {

            for(var j = 0; j < total_externo; j++) {
                if(typeof jsonInterno[i] != 'undefined' && typeof jsonExterno[j] != 'undefined') {
                    if(jsonInterno[i].id == jsonExterno[j].id) {
                        jsonInterno[i] = jsonExterno[j];
                        delete jsonExterno[j];
                    }
                }
            }

        }

        var externo = JSON.stringify(jsonExterno).split("null,").join("").split("null").join("");

        if(typeof externo != 'undefined' && externo != '' && externo != "[null]" && externo != null && externo != 'null') {
            var virgula = "";
            if(JSON.stringify(jsonInterno).split("[").join("").split("]").join("") != "" && externo.split("[").join("").split("]").join("") != "") { virgula = ","; }
            var json = JSON.stringify(jsonInterno).split("[").join("").split("]").join("") + virgula + externo.split("[").join("").split("]").join("");

        } else {
            var json = JSON.stringify(jsonInterno).split("[").join("").split("]").join("");
        }
        return json;
    } else {
        var json = JSON.stringify(jsonInterno).split("[").join("").split("]").join("");
        return json;
    }
}


function lerArquivo(caminho, callback) {
    caminho = "Spotcheck/"+caminho;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        function(fileSystem) {
            fileSystem.root.getFile("" + caminho + "", null,
                function(fileEntry) {
                    fileEntry.file(
                        function(file) {
                            var reader = new FileReader();
                            reader.onloadend = function(evt) {
                                conteudo = evt.target.result;
                                if (conteudo != "" && conteudo != null) {
                                    if (conteudo[conteudo.length - 1] == ",") {
                                        conteudo = conteudo.slice(0, -1);
                                    }
                                }
                                conteudo = $.trim(conteudo);
                                //console.log(caminho);
                                //console.log("conteúdo:" +conteudo);
                                conteudo = JSON.parse("[" + conteudo + "]");
                                callback(conteudo);
                            };
                            reader.readAsText(file);
                        }, function(error) {
                            console.log(error);
                        });

                }, function(error) {
                    console.log(error);
                });
        },
        function(error) {
            console.log(error);
        });

}

function escreverArquivo(caminho, conteudo, nao_adicionar, callback) {
    caminho = "Spotcheck/"+caminho;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        function(fileSystem) {

            fileSystem.root.getDirectory("Spotcheck", {create: true, exclusive: true}, 
                function() {
                    //Sucesso ao criar diretório
                    fileSystem.root.getFile("" + caminho + "", {
                        create: true,
                        exclusive: false
                    },
                    function(fileEntry) {
                        fileEntry.createWriter(
                            function(writer) {
                                if (nao_adicionar == 0) {
                                    writer.seek(writer.length);
                                }
                                writer.write("" + conteudo + "");
                                writer.onwriteend = function(evt) {
                                    if (typeof callback != "undefined") {
                                        callback();
                                    }
                                };
                            }, function(error) {
                                alert("Failed to create writer");
                                callback(false);
                            });

                    }, function() {
                        alert("Failed to get fileEntry");
                        callback(false);
                    });
                }
            , function() {
                //Erro ao criar diretório;
                fileSystem.root.getFile("" + caminho + "", {
                    create: true,
                    exclusive: false
                },
                function(fileEntry) {
                    fileEntry.createWriter(
                        function(writer) {
                            if (nao_adicionar == 0) {
                                writer.seek(writer.length);
                            }
                            writer.write("" + conteudo + "");
                            writer.onwriteend = function(evt) {
                                if (typeof callback != "undefined") {
                                    callback();
                                }
                            };
                        }, function(error) {
                            alert("Failed to create writer");
                            callback(false);
                        });

                }, function() {
                    alert("Failed to get fileEntry");
                    callback(false);
                });

                
            });

         
        },
        function(error) {
            alert("Failed to get fileSystem");
            callback(false);
        });

}

function removerArquivo(caminho, conteudo, callback) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        function(fileSystem) {
            fileSystem.root.getFile("" + caminho + "", null,
                function(fileEntry) {
                    fileEntry.remove(function() {
                        callback();
                    }, function() {
                        callback(false)
                    });
                }, function() {
                    callback(false)
                });
        }, function() {
            callback(false)
        });
}

function checkInternet() {

    //var networkState = navigator.connection.type;

    if($(".conexao.off").length > 0) {

        //onConnexionError();
        return false;

    } else {

       return true;
    }
}