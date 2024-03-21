export default function copyText(text: string) {
  navigator.clipboard.writeText(text).then(function () {
    alert('Copiado com sucesso!')
  }, function (err) {
    alert('Não foi possível copiar!')
  });
}