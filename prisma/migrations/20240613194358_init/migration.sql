-- CreateEnum
CREATE TYPE "Estatus" AS ENUM ('activo', 'inactivo');

-- CreateTable
CREATE TABLE "Estado" (
    "id_estado" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id_estado")
);

-- CreateTable
CREATE TABLE "Municipio" (
    "id_municipio" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "id_estado" INTEGER NOT NULL,

    CONSTRAINT "Municipio_pkey" PRIMARY KEY ("id_municipio")
);

-- CreateTable
CREATE TABLE "Localidad" (
    "id_localidad" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cp" TEXT,
    "id_municipio" INTEGER NOT NULL,

    CONSTRAINT "Localidad_pkey" PRIMARY KEY ("id_localidad")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id_cliente" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "rfc" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "estatus" "Estatus" NOT NULL DEFAULT 'activo',

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "id_direccion" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_localidad" INTEGER NOT NULL,
    "calle" TEXT NOT NULL,
    "numero_exterior" TEXT NOT NULL,
    "numero_interior" TEXT,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("id_direccion")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estado_nombre_key" ON "Estado"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Municipio_nombre_id_estado_key" ON "Municipio"("nombre", "id_estado");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_rfc_key" ON "Cliente"("rfc");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- AddForeignKey
ALTER TABLE "Municipio" ADD CONSTRAINT "Municipio_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "Estado"("id_estado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Localidad" ADD CONSTRAINT "Localidad_id_municipio_fkey" FOREIGN KEY ("id_municipio") REFERENCES "Municipio"("id_municipio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_id_localidad_fkey" FOREIGN KEY ("id_localidad") REFERENCES "Localidad"("id_localidad") ON DELETE RESTRICT ON UPDATE CASCADE;
